temaGlobal = "custom_office_dark_blue";

function inicializarBase(tema, caminhoBase, paginaInicial, altura)
{
    if (typeof(caminhoBase) === "undefined")
        caminhoBase = "";

    if (typeof(paginaInicial) === "undefined")
        paginaInicial = false;

    if (typeof(altura) === "undefined")
        altura = "auto";

    $("#jqxMenu_menuPrincipal").jqxMenu({ width: "640px", height: "36px", theme: tema, showTopLevelArrows: true, animationShowDuration: 0, animationHideDuration: 0, animationShowDelay: 0, animationHideDelay: 0 });

    $("#jqxPanel_main").jqxResponsivePanel({ width: "640px", height: altura, collapseBreakpoint: "0", theme: tema });

    if (!paginaInicial)
    {
        var caminhoImagem = caminhoBase + "imagens/pokelinia-topo";
        var caminhoImagemNormal = caminhoImagem + ".png";
        var caminhoImagemDestacado = caminhoImagem + "-destacado.png";

        var precarga = new Image();
        precarga.src = caminhoImagemDestacado;

        $("#img_logo").hover(
            function () { $(this).attr("src", caminhoImagemDestacado); },
            function () { $(this).attr("src", caminhoImagemNormal); }
        );

        $("#a_logo").attr("href", caminhoBase + "index.html");
    }
}

function finalizarBase()
{
    $("body").css("visibility", "visible");
}
