var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var qs = require("querystring");
var sqlite3 = require("sqlite3").verbose();
var hasha = require("hasha")
var ajustadores = require("./ajustadores");

var diretorioCliente = path.join(process.cwd(), "../build");

var idDoUsuarioLogado;
var nomeDoUsuarioLogado;

var bd = new sqlite3.Database(":memory:");

bd.serialize(function()
{
    bd.run(
        `
            CREATE TABLE usuarios
            (
                id_usuario INTEGER PRIMARY KEY NOT NULL,
                nome       VARCHAR(50) NOT NULL,
                email      VARCHAR(50) NOT NULL,
                hashSenha  VARCHAR(50) NOT NULL
            );
        `
    );
    bd.run(
        `
            CREATE TABLE times
            (
                id_time    INTEGER primary key NOT NULL,
                id_usuario INTEGER NOT NULL references users(user_id),
                nome       VARCHAR(100) NOT NULL
            );
        `
    );
});

function devolverErro(resposta, erro)
{
    resposta.writeHead(500, {"Content-Type": "text/plain"});
    resposta.write(erro + '\n');
    resposta.end();
}

function devolverPedidoGrandeDemais()
{
    resposta.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/plain" });
    resposta.write("pedido_grande_demais");
    resposta.end();
}

function devolverSucessoPadrao(resposta)
{
    resposta.writeHead(200, { "Content-Type": "text/plain" });
    resposta.write("sucesso");
    resposta.end();
}

function devolverResultado(resposta, resultado)
{
    resposta.writeHead(200, {"Content-Type": "text/plain"});
    resposta.write(resultado);
    resposta.end();
}

function pCriarTime(conteudoDoPedido, pedido, resposta)
{
    var sessao = conteudoDoPedido.sessao;
    var nomeDoTime = conteudoDoPedido.nomeDoTime;

    devolverSucessoPadrao(resposta);
}

function pExcluirTime(conteudoDoPedido, pedido, resposta)
{
    var sessao = conteudoDoPedido.sessao;
    var nomeDoTime = conteudoDoPedido.nomeDoTime;

    devolverSucessoPadrao(resposta);
}

function pCadastrarUsuario(conteudoDoPedido, pedido, resposta)
{
    var nomeDoUsuario = conteudoDoPedido.nomeDoUsuario;
    var email = conteudoDoPedido.email;
    var senha = conteudoDoPedido.senha;
    var senhaDeConfirmacao = conteudoDoPedido.senhaDeConfirmacao;

    var comando = bd.prepare("SELECT * FROM usuarios WHERE usuarios.nome = ? OR usuarios.email = ?;");
    comando.all(nomeDoUsuario, email, function(erro, linhas)
    {
        if (erro === null)
        {
            var nomeJaEmUso = false;
            var emailJaEmUso = false;
            for (var i = 0; i < linhas.length; ++i)
            {
                if (linhas[i].nome === nomeDoUsuario)
                {
                    nomeJaEmUso = true;
                    break;
                }
                if (linhas[i].email === email)
                {
                    emailJaEmUso = true;
                    break;
                }
            }

            if (nomeJaEmUso)
                devolverResultado(resposta, "nome_ja_em_uso");
            else if (emailJaEmUso)
                devolverResultado(resposta, "email_ja_em_uso");
            else if (senha !== senhaDeConfirmacao)
                devolverErro(resposta, "senha_confirmacao_invalida");
            else
            {
                var hashSenha = hasha(senha);
                comando = bd.prepare("INSERT INTO usuarios(nome, email, hashSenha) VALUES(?, ?, ?);");
                comando.run(nomeDoUsuario, email, hashSenha);
                comando.finalize();

                devolverResultado(resposta, "sucesso\n" + hasha(nomeDoUsuario + ':' + hashSenha));
            }
        }
    });
    comando.finalize();
}

function pLogarUsuario(conteudoDoPedido, pedido, resposta)
{
    var nomeDoUsuario = conteudoDoPedido.nomeDoUsuario;
    var senha = conteudoDoPedido.senha;
    var hashSenha = hasha(senha);

    var comando = bd.prepare("SELECT * FROM usuarios WHERE usuarios.nome = ? AND usuarios.hashSenha = ?;");
    comando.all(nomeDoUsuario, hashSenha, function(erro, linhas)
    {
        if (erro === null)
        {
            if (linhas.length === 1)
                devolverResultado(resposta, "sucesso\n" + hasha(nomeDoUsuario + ':' + hashSenha));
            else
                devolverResultado(resposta, "dados_invalidos");
        }
    });
}

function obterCookies(pedido)
{
    var lista = {}, rc = pedido.headers.cookie;

    rc && rc.split(';').forEach(function(cookie)
    {
        var partes = cookie.split('=');
        lista[partes.shift().trim()] = decodeURI(partes.join('='));
    });

    return lista;
}

function sessaoParaIdentidade(cookies, resposta, caminhoLocal, conteudoDoArquivo, nomeBaseDoArquivo, extensaoDoArquivo)
{
    var sessao = cookies.sessao;
    idDoUsuarioLogado = null;
    nomeDoUsuarioLogado = null;
    if (sessao != undefined)
    {
        bd.each("SELECT * FROM usuarios;", function(erro, linha)
        {
            if (erro === null)
            {
                if (sessao === hasha(linha.nome + ':' + linha.hashSenha))
                {
                    idDoUsuarioLogado = linha.id_usuario;
                    nomeDoUsuarioLogado = linha.nome;
                }
            }
        }, function () {
            var timesDoUsuarioLogado;
            var comando = bd.prepare("SELECT * FROM times WHERE times.id_usuario = ?;");
            comando.all(idDoUsuarioLogado, function(erro, linhas)
            {
                if (erro === null)
                {
                    var timesDoUsuarioLogado = "";
                    for (var i = 0; i < linhas.length; ++i)
                    {
                        timesDoUsuarioLogado += linhas[i].nome;
                        if (i < linhas.length - 1)
                            timesDoUsuarioLogado += ",\n        ";
                    }
                }
            });
            conteudoDoArquivo = ajustadores.ajustarConteudo(
                conteudoDoArquivo,
                nomeBaseDoArquivo,
                extensaoDoArquivo,
                nomeDoUsuarioLogado,
                timesDoUsuarioLogado
            ).toString("utf8");
            if (nomeBaseDoArquivo !== "index")
            {
                
                resposta.writeHead(200);
                resposta.write(conteudoDoArquivo, "utf8");
                resposta.end();
            }
            else
            {
                caminhoLocal = caminhoLocal.replace(/index/g, "index.logado");
                nomeBaseDoArquivo = path.basename(caminhoLocal).replace(/\.[^/.]+$/, "");
                extensaoDoArquivo = path.extname(caminhoLocal);
                fs.readFile(caminhoLocal, "utf8", function (erro, conteudoDoArquivoEscolhido)
                {
                    if (erro)
                        devolverErro(resposta, erro);
                    else
                    {
                        conteudoDoArquivoEscolhido = ajustadores.ajustarConteudo(
                            conteudoDoArquivoEscolhido,
                            nomeBaseDoArquivo,
                            extensaoDoArquivo,
                            nomeDoUsuarioLogado,
                            timesDoUsuarioLogado
                        ).toString("utf8");
                        resposta.writeHead(200);
                        resposta.write(conteudoDoArquivoEscolhido, "utf8");
                        resposta.end();
                    }
                });
            }
        });
    }
    else
    {
        resposta.writeHead(200);
        resposta.write(conteudoDoArquivo, "utf8");
        resposta.end();
    }
}

var servidor = http.createServer(function(pedido, resposta)
{
    var caminhoNoPedido = url.parse(pedido.url).pathname;
    if (caminhoNoPedido === "/")
        caminhoNoPedido = "/index.html";
    var caminhoLocal = path.join(diretorioCliente, caminhoNoPedido);
    var nomeBaseDoArquivo = path.basename(caminhoLocal).replace(/\.[^/.]+$/, "");
    var extensaoDoArquivo = path.extname(caminhoLocal);
    var cookies = obterCookies(pedido);

    if (pedido.method === "POST")
    {
        var conteudoDoPedido = "";
        pedido.on("data", function (dados)
        {
            conteudoDoPedido += dados;
            if (conteudoDoPedido.length > 1024)
                devolverPedidoGrandeDemais(resposta);
        });
        if (caminhoNoPedido === "/paginas/gerenciarTimes/pCriarTime")
        {
            pedido.on("end", function ()
            {
                conteudoDoPedido = qs.parse(conteudoDoPedido);
                pCriarTime(
                    conteudoDoPedido,
                    pedido,
                    resposta
                );
            });
        }
        else if (caminhoNoPedido === "/paginas/gerenciarTimes/pExcluirTime")
        {
            pedido.on("end", function ()
            {
                conteudoDoPedido = qs.parse(conteudoDoPedido);
                pExcluirTime(
                    conteudoDoPedido,
                    pedido,
                    resposta
                )
            });
        }
        else if (caminhoNoPedido === "/paginas/minhaConta/pCadastrarUsuario")
        {
            pedido.on("end", function ()
            {
                conteudoDoPedido = qs.parse(conteudoDoPedido);
                pCadastrarUsuario(
                    conteudoDoPedido,
                    pedido,
                    resposta
                );
            });
        }
        else if (caminhoNoPedido === "/paginas/minhaConta/pLogarUsuario")
        {
            pedido.on("end", function ()
            {
                conteudoDoPedido = qs.parse(conteudoDoPedido);
                pLogarUsuario(
                    conteudoDoPedido,
                    pedido,
                    resposta
                );
            });
        }
        return;
    }

    if (!fs.existsSync(caminhoLocal))
    {
        resposta.statusCode = 302; 
        resposta.setHeader("Location", "/paginas/404/404.html");
        resposta.end();
    }
    else if (extensaoDoArquivo === ".html" || extensaoDoArquivo === ".js")
    {
        fs.readFile(caminhoLocal, "utf8", function (erro, conteudoDoArquivo)
        {
            if (erro)
                devolverErro(resposta, erro);
            else
            {
                sessaoParaIdentidade(cookies, resposta, caminhoLocal, conteudoDoArquivo, nomeBaseDoArquivo, extensaoDoArquivo);
            }
        });
    }
    else
    {
        fs.readFile(caminhoLocal, "binary", function (erro, conteudoDoArquivo)
        {
            if (erro)
                devolverErro(resposta, erro);
            else
            {
                resposta.writeHead(200);
                resposta.write(conteudoDoArquivo, "binary");
                resposta.end();
            }
        });
    }
});
servidor.listen(80);
console.log("O servidor está escutando na porta 80.");
