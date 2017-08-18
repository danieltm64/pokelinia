function ajustarConteudo(
    conteudoDoArquivo,
    nomeBaseDoArquivo,
    extensaoDoArquivo,
    nomeDoUsuarioLogado,
    timesDoUsuarioLogado
)
{
    if (extensaoDoArquivo === ".html")
    {
        if (nomeBaseDoArquivo === "index.logado")
            conteudoDoArquivo = ajustarHtml_index_logado(conteudoDoArquivo, nomeDoUsuarioLogado);
        else if (nomeBaseDoArquivo === "gerenciarTimes")
            conteudoDoArquivo = ajustarHtml_gerenciarTimes(conteudoDoArquivo, nomeDoUsuarioLogado);
        else if (nomeBaseDoArquivo === "404")
            conteudoDoArquivo = ajustarHtml_404(conteudoDoArquivo, nomeDoUsuarioLogado);
    }
    else if (extensaoDoArquivo === ".js")
    {
        if (nomeBaseDoArquivo === "gerenciarTimes")
            conteudoDoArquivo = ajustarJs_gerenciarTimes(conteudoDoArquivo, nomeDoUsuarioLogado, timesDoUsuarioLogado);
    }

    return conteudoDoArquivo;
}

function ajustarHtml_index_logado(
    conteudoDoArquivo,
    nomeDoUsuarioLogado
)
{
    regex = new RegExp("<!-- pdi_nomeDoUsuarioLogado -->", "g");
    conteudoDoArquivo = conteudoDoArquivo.replace(regex, nomeDoUsuarioLogado);

    return conteudoDoArquivo;
}

function ajustarHtml_gerenciarTimes(
    conteudoDoArquivo,
    nomeDoUsuarioLogado
)
{
    regex = new RegExp("<!-- pdi_nomeDoUsuarioLogado -->", "g");
    conteudoDoArquivo = conteudoDoArquivo.replace(regex, nomeDoUsuarioLogado);

    return conteudoDoArquivo;
}

function ajustarJs_gerenciarTimes(
    conteudoDoArquivo,
    nomeDoUsuarioLogado,
    timesDoUsuarioLogado
)
{
    regex = new RegExp("/* pdi_timesDoUsuarioLogado */", "g");
    conteudoDoArquivo = conteudoDoArquivo.replace(regex, timesDoUsuarioLogado);

    return conteudoDoArquivo;
}

function ajustarHtml_404(
    conteudoDoArquivo,
    nomeDoUsuarioLogado
)
{
    regex = new RegExp("<!-- pdi_nomeDoUsuarioLogado -->", "g");
    conteudoDoArquivo = conteudoDoArquivo.replace(regex, nomeDoUsuarioLogado);
    
    var menuMinhaContaNaoLogado = "<li><a id=\"menu_minhaConta\" href=\"../minhaConta/minhaConta.html\">[ Minha Conta ]</a></li>";
    var menuMinhaContaLogado =
        "<li>"
        + "    <span>Minha Conta (<!-- pdi_nomeDoUsuarioLogado -->)</span>"
        + "    <ul style=\"width: 170px;\">"
        + "        <li><a id=\"menu_gerenciarTimes\" href=\"/paginas/gerenciarTimes/gerenciarTimes.html\">Gerenciar Times</a></li>"
        + "        <li><a id=\"menu_sairDaConta\" href=\"/paginas/sairDaConta/sairDaConta.html\">Sair da Conta</a></li>"
        + "    </ul>"
        + "</li>";
    var menuMinhaConta;
    if (nomeDoUsuarioLogado === "")
        menuMinhaConta = menuMinhaContaNaoLogado;
    else
    {
        regex = new RegExp("<!-- pdi_nomeDoUsuarioLogado -->", "g");
        menuMinhaConta = menuMinhaContaLogado.replace(regex, nomeDoUsuarioLogado);
    }

    regex = new RegExp("<!-- pdi_menuMinhaConta -->", "g");
    conteudoDoArquivo = conteudoDoArquivo.replace(regex, menuMinhaConta);

    return conteudoDoArquivo;
}

exports.ajustarConteudo = ajustarConteudo;
