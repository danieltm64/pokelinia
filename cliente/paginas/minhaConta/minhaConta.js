var temaLocal = temaGlobal;

function centralizarJanela(seletor)
{
    $(seletor).jqxWindow("move", ($(window).width() - $(seletor).jqxWindow("width")) / 2, 99);
}

function refrescarValoresIniciais()
{
    $("#jqxInput_login_nomeDeUsuario").jqxInput("val", "");
    $("#jqxPasswordInput_login_senha").jqxInput("val", "");

    $("#jqxInput_criarConta_nomeDeUsuario").jqxInput("val", "");
    $("#jqxInput_criarConta_email").jqxInput("val", "");
    $("#jqxPasswordInput_criarConta_senha").jqxInput("val", "");
    $("#jqxPasswordInput_criarConta_senhaDeConfirmacao").jqxInput("val", "");

    $("#jqxCheckBox_criarConta_aceitarTermosDeUso").jqxCheckBox("uncheck");
}

function validarNomeDeUsuario(nomeDeUsuario)
{
    var expressaoRegular = /[^a-zA-Z0-9_.-]+/;
    return !expressaoRegular.test(nomeDeUsuario);
}

function validarEmail(email)
{
    var expressaoRegular = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    return expressaoRegular.test(email);
}

function redirecionar()
{
    refrescarValoresIniciais();
    $("#jqxWindow_mensagem").jqxWindow("close");
    window.location.href = "../gerenciarTimes/gerenciarTimes.html";
}

$(document).ready(function ()
{
    inicializarBase(temaLocal, "../../");

    $("#jqxWindow_criarConta_termosDeUso").jqxWindow({ width: "640px", height: "236px", theme: temaLocal, autoOpen: false, isModal: true, resizable: false, draggable: false });
    $("#jqxWindow_criarConta_aceitarTermosDeUso").jqxWindow({ width: "640px", height: "125px", theme: temaLocal, autoOpen: false, isModal: true, resizable: false, draggable: false });
    $("#jqxWindow_mensagem").jqxWindow({ width: "640px", height: "200px", theme: temaLocal, autoOpen: false, isModal: true, resizable: false, draggable: false });

    $(window).resize(function ()
    {
        centralizarJanela("#jqxWindow_criarConta_termosDeUso");
        centralizarJanela("#jqxWindow_criarConta_aceitarTermosDeUso");
        centralizarJanela("#jqxWindow_mensagem");
    });

    $("#jqxInput_login_nomeDeUsuario").jqxInput({ width: "290px", height: "34px", theme: temaLocal });
    $("#jqxPasswordInput_login_senha").jqxPasswordInput({  width: "290px", height: "34px", theme: temaLocal });
    $("#jqxButton_login_logar").jqxButton({ width: "208px", height: "36px", theme: temaLocal });

    $("#jqxButton_login_logar").on("click", function (event)
    {
        var nomeDeUsuario = $("#jqxInput_login_nomeDeUsuario").jqxInput("val");
        var senha = $("#jqxPasswordInput_login_senha").jqxPasswordInput("val");

        centralizarJanela("#jqxWindow_mensagem");
        if (nomeDeUsuario === "")
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Por favor especifique um nome de usuário.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (!validarNomeDeUsuario(nomeDeUsuario))
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>O nome de usuário só pode ser formado pelos seguintes caractreres:</p><p>Letras minúsculas e maiúsculas<br />Digitos<br />Sublinhados (_)<br />Pontos (.)<br />Hífens (-)<br /><br />Espaços não são permitidos.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "238px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (senha === "")
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Por favor especifique uma senha.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else
        {
            $.ajax({ type: "POST", url: "pLogarUsuario", data:
            {
                nomeDoUsuario: nomeDeUsuario,
                senha: senha,
            }, dataType: "text", async: false })
            .done(function (resposta)
            {
                if (resposta.startsWith("sucesso"))
                {
                    Cookies.set("sessao", resposta.split('\n')[1]);
                    setTimeout(redirecionar, 3000);
                }
                else
                {
                    $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Os dados de login fornecidos são inválidos.</p>");
                    $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
                    $("#jqxWindow_mensagem").jqxWindow("open");
                }
            })
            .fail(function()
            {
                alert("Não foi possível contactar o servidor.");
            });
        }
    });

    $("#jqxInput_criarConta_nomeDeUsuario").jqxInput({ width: "290px", height: "34px", theme: temaLocal, placeHolder: "Caracteres válidos: a-z A-Z 0-9 _ . -" });
    $("#jqxInput_criarConta_email").jqxInput({ width: "290px", height: "34px", theme: temaLocal });
    $("#jqxPasswordInput_criarConta_senha").jqxPasswordInput({  width: "290px", height: "34px", theme: temaLocal, showStrength: true,
        strengthTypeRenderer: function (senha, caracteres, forcaDefault) {
            var tamanho = senha.length;
            var letras = caracteres.letters;
            var numeros = caracteres.numbers;
            var teclasEspeciais = caracteres.specialKeys;
            var coeficienteDeForca = letras + numeros + 2 * teclasEspeciais + letras * numeros / 2 + tamanho;
            var valorDaForca;
            var cor;
            if (tamanho < 8)
            {
                valorDaForca = "Curto demais";
                cor = "rgb(255, 0, 0)";
            }
            else if (coeficienteDeForca < 20)
            {
                valorDaForca = "Fraco";
                cor = "rgb(255, 0, 0)";
            }
            else if (coeficienteDeForca < 30)
            {
                valorDaForca = "Mais ou menos";
                cor = "rgb(241, 125, 47)";
            }
            else if (coeficienteDeForca < 40)
            {
                valorDaForca = "Bom";
                cor = "rgb(45, 152, 243)";
            }
            else
            {
                valorDaForca = "Forte";
                cor = "rgb(77, 170, 77)";
            }
            return "<div style=\"font-style: italic; font-weight: bold; color: " + cor + ";\">" + valorDaForca + "</div>";
        }
    });
    $("#jqxPasswordInput_criarConta_senhaDeConfirmacao").jqxPasswordInput({  width: "290px", height: "34px", theme: temaLocal, showStrength: true,
        strengthTypeRenderer: function (senha, caracteres, forcaDefault) {
            var cor;
            var mensagem;
            var senha1 = $("#jqxPasswordInput_criarConta_senha").jqxPasswordInput("val");
            var senha2 = $("#jqxPasswordInput_criarConta_senhaDeConfirmacao").jqxPasswordInput("val");
            if (senha1 === senha2)
            {
                mensagem = "As senhas batem.";
                cor = "rgb(77, 170, 77)";
            }
            else
            {
                mensagem = "As senhas não batem.";
                cor = "rgb(255, 0, 0)";
            }
            return "<div style=\"font-style: italic; font-weight: bold; color: " + cor + ";\">" + mensagem + "</div>";
        }
    });
    $("#jqxButton_criarConta_visualizarTermosDeUso").jqxButton({ width: "298px", height: "36px", theme: temaLocal, textImageRelation: "imageBeforeText" });
    $("#jqxCheckBox_criarConta_aceitarTermosDeUso").jqxCheckBox({ width: "298px", height: "25px", theme: temaLocal, locked: true });
    $("#jqxButton_criarConta_criarConta").jqxButton({ width: "208px", height: "36px", theme: temaLocal, disabled: true });

    $("#jqxButton_criarConta_visualizarTermosDeUso").on("click", function (event)
    {
        centralizarJanela("#jqxWindow_criarConta_termosDeUso");
        $("#jqxWindow_criarConta_termosDeUso").jqxWindow("open");
        $("#jqxButton_criarConta_visualizarTermosDeUso").jqxButton({ template: "success"});
        $("#jqxCheckBox_criarConta_aceitarTermosDeUso").jqxCheckBox({ locked: false });
    });

    $("#jqxCheckBox_criarConta_aceitarTermosDeUso").on("click", function (event)
    {
        if ($("#jqxCheckBox_criarConta_aceitarTermosDeUso").jqxCheckBox("locked"))
        {
            centralizarJanela("#jqxWindow_criarConta_aceitarTermosDeUso");
            $("#jqxWindow_criarConta_aceitarTermosDeUso").jqxWindow("open");
        }
        else if ($("#jqxCheckBox_criarConta_aceitarTermosDeUso").jqxCheckBox("checked"))
            $("#jqxButton_criarConta_criarConta").jqxButton({ disabled: false });
    });

    $("#jqxCheckBox_criarConta_aceitarTermosDeUso").on("unchecked", function (event)
    {
        $("#jqxButton_criarConta_criarConta").jqxButton({ disabled: true });
    });

    $("#jqxButton_criarConta_criarConta").on("click", function (event)
    {
        var nomeDeUsuario = $("#jqxInput_criarConta_nomeDeUsuario").jqxInput("val");
        var email = $("#jqxInput_criarConta_email").jqxInput("val");
        var senha = $("#jqxPasswordInput_criarConta_senha").jqxPasswordInput("val");
        var senhaDeConfirmacao = $("#jqxPasswordInput_criarConta_senhaDeConfirmacao").jqxPasswordInput("val");

        centralizarJanela("#jqxWindow_mensagem");
        if (nomeDeUsuario === "")
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Por favor especifique um nome de usuário.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (!validarNomeDeUsuario(nomeDeUsuario))
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>O nome de usuário só pode ser formado pelos seguintes caractreres:</p><p>Letras minúsculas e maiúsculas<br />Digitos<br />Sublinhados (_)<br />Pontos (.)<br />Hífens (-)<br /><br />Espaços não são permitidos.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "238px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (email === "")
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Por favor especifique um endereço de e-mail.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (!validarEmail(email))
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>O endereço de e-mail fornecido não parece ser válido.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (senha === "")
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Por favor especifique uma senha.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else if (senha !== senhaDeConfirmacao)
        {
            $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>A senha fornecida não bate com a senha de confirmação.</p>");
            $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
            $("#jqxWindow_mensagem").jqxWindow("open");
        }
        else
        {
            $.ajax({ type: "POST", url: "pCadastrarUsuario", data:
            {
                nomeDoUsuario: nomeDeUsuario,
                email: email,
                senha: senha,
                senhaDeConfirmacao: $("#jqxPasswordInput_criarConta_senhaDeConfirmacao").val()
            }, dataType: "text", async: false })
            .done(function (resposta)
            {
                if (resposta.startsWith("sucesso"))
                {
                    Cookies.set("sessao", resposta.split('\n')[1]);
                    $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>Parabéns, a sua conta foi criada com sucesso!</p>");
                    $("#jqxWindow_mensagem").jqxWindow({ title: "Sucesso!", height: "84px", showCloseButton: false });
                    $("#jqxWindow_mensagem").jqxWindow("open");
                    setTimeout(redirecionar, 3000);
                }
                else if (resposta === "nome_ja_em_uso")
                {
                    $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>O nome de usuário fornecido já está em uso.</p>");
                    $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
                    $("#jqxWindow_mensagem").jqxWindow("open");
                }
                else if (resposta === "email_ja_em_uso")
                {
                    $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>O e-mail fornecido já está em uso.</p>");
                    $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
                    $("#jqxWindow_mensagem").jqxWindow("open");
                }
                else if (resposta === "senha_confirmacao_invalida")
                {
                    $("#jqxWindow_mensagem").jqxWindow("setContent", "<p>A senha fornecida não bateu com a senha de confirmação.</p>");
                    $("#jqxWindow_mensagem").jqxWindow({ title: "Dados Inválidos", height: "84px", showCloseButton: true });
                    $("#jqxWindow_mensagem").jqxWindow("open");
                }
            })
            .fail(function()
            {
                alert("Não foi possível contactar o servidor.");
            });
        }
    });

    refrescarValoresIniciais();

    finalizarBase();
});
