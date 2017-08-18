var temaLocal = temaGlobal;

$(document).ready(function ()
{
    inicializarBase(temaLocal, "../../");

    Cookies.remove("sessao");

    finalizarBase();
});
