var temaLocal = temaGlobal;

var pokemonSelecionadoAntesDeEditar;
var tamanhoDePagina = 5;
var timeAtual = "";
var pokemonsAtuais = {};

function centralizarJanela(seletor)
{
    $(seletor).jqxWindow("move", ($(window).width() - $(seletor).jqxWindow("width")) / 2, 99);
}

function adicionarPokemon()
{
    var indiceDoPokemonSelecionado = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getselectedrowindex");
    if (indiceDoPokemonSelecionado == -1)
    {
        alert("Por favor selecione o nome do Pokémon.");
        return;
    }

    var nomeDoPokemon = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getrowdata", indiceDoPokemonSelecionado).name;

    var habilidadesSelecionadas = $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("getSelectedItems");
    var numeroDeHabilidades = habilidadesSelecionadas.length;
    if (numeroDeHabilidades === undefined)
        numeroDeHabilidades = 0;

    if (numeroDeHabilidades > 4)
    {
        alert("Você selecionou " + numeroDeHabilidades + " habilidades mas o máximo é 4.");
        return;
    }

    var habilidadesListadas = "";
    for (var i = 0; i < numeroDeHabilidades; ++i)
    {
        habilidadesListadas += habilidadesSelecionadas[i].label;
        if (i < numeroDeHabilidades - 1)
            habilidadesListadas += ", ";
    }
    var novoValor = nomeDoPokemon + '\n' + habilidadesListadas;
    var novoHtml = "<div><strong>" + nomeDoPokemon + "</strong></div><div>Habilidades: <em>" + habilidadesListadas + "</em></div>";
    $("#jqxListBox_pokemons").jqxListBox("addItem",
    {
        value: novoValor,
        html: novoHtml
    });

    pokemonsAtuais[timeAtual].push(novoValor);

    $("#jqxWindow_acaoPokemon").jqxWindow("close");
}

function editarPokemon()
{
    var indiceDoPokemonSelecionado = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getselectedrowindex");
    if (indiceDoPokemonSelecionado == -1)
    {
        alert("Por favor selecione o nome do Pokémon.");
        return;
    }

    var nomeDoPokemon = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getrowdata", indiceDoPokemonSelecionado).name;

    var habilidadesSelecionadas = $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("getSelectedItems");
    var numeroDeHabilidades = habilidadesSelecionadas.length;
    if (numeroDeHabilidades === undefined)
        numeroDeHabilidades = 0;

    if (numeroDeHabilidades > 4)
    {
        alert("Você selecionou " + numeroDeHabilidades + " habilidades mas o máximo é 4.");
        return;
    }

    var habilidadesListadas = "";
    for (var i = 0; i < numeroDeHabilidades; ++i)
    {
        habilidadesListadas += habilidadesSelecionadas[i].label;
        if (i < numeroDeHabilidades - 1)
            habilidadesListadas += ", ";
    }
    var novoValor = nomeDoPokemon + '\n' + habilidadesListadas;
    var novoHtml = "<div><strong>" + nomeDoPokemon + "</strong></div><div>Habilidades: <em>" + habilidadesListadas + "</em></div>";
    $("#jqxListBox_pokemons").jqxListBox("updateItem",
    {
        value: novoValor,
        html: novoHtml
    },
    pokemonSelecionadoAntesDeEditar.value);

    pokemonsAtuais[timeAtual][$("#jqxListBox_pokemons").jqxListBox("getSelectedIndex")] = novoValor;

    $("#jqxWindow_acaoPokemon").jqxWindow("close");
}

function corrigirComboBox(seletor)
{
    $(seletor).find(".jqx-combobox-arrow-normal").height(28);
}

$(document).ready(function ()
{
    inicializarBase(temaLocal, "../../", false, "569px");

    var sessaoAtual = Cookies.get("sessao");

    var times = [
        /* pdi_timesDoUsuarioLogado */
    ];

    var pokemonsPorTime = [];

    $("#jqxWindow_criarTime").jqxWindow({ width: "640px", height: "100px", theme: temaLocal, autoOpen: false, isModal: true, resizable: false, draggable: false });
    $("#jqxWindow_acaoPokemon").jqxWindow({ width: "640px", height: "640px", theme: temaLocal, autoOpen: false, isModal: true, resizable: false, draggable: false, maxHeight: "640px" });

    $(window).resize(function ()
    {
        centralizarJanela("#jqxWindow_criarTime");
        centralizarJanela("#jqxWindow_acaoPokemon");
    });

    $("#jqxButton_criarTime").jqxButton({ width: "110px", height: "36px", theme: temaLocal });
    $("#jqxButton_excluirTime").jqxButton({ width: "130px", height: "36px", theme: temaLocal });
    $("#jqxDropDownList_times").jqxDropDownList({ width: "242px", height: "25px", theme: temaLocal, source: times, autoDropDownHeight: true, selectedIndex: 0, placeHolder: times.length > 0 ? "Selecione um time" : "Lista de times vazia" });

    $("#jqxButton_adicionarPokemon").jqxButton({ width: "185px", height: "36px", theme: temaLocal });
    $("#jqxButton_excluirPokemon").jqxButton({ width: "170px", height: "36px", theme: temaLocal });
    $("#jqxButton_editarPokemon").jqxButton({ width: "170px", height: "36px", theme: temaLocal });
    $("#jqxListBox_pokemons").jqxListBox({ width: "531px", height: "308px", theme: temaLocal });

    $("#jqxInput_criarTime_nomeDoTime").jqxInput({ width: "290px", height: "34px", theme: temaLocal });
    $("#jqxButton_criarTime_criar").jqxButton({ width: "80px", height: "36px", theme: temaLocal });

    var ptBR_jqxGrid = {};
    ptBR_jqxGrid.pagergotopagestring = "Ir para página:";
    ptBR_jqxGrid.pagershowrowsstring = "Número de linhas:";
    ptBR_jqxGrid.pagerrangestring = " de ";
    ptBR_jqxGrid.pagernextbuttonstring = "Próxima página";
    ptBR_jqxGrid.pagerpreviousbuttonstring = "Página anterior";
    ptBR_jqxGrid.sortascendingstring = "Ordenar ascendent";
    ptBR_jqxGrid.sortdescendingstring = "Ordenar descendente";
    ptBR_jqxGrid.sortremovestring = "Remover";

    var fonteDeDados_nomes =
    {
        datatype: "json",
        datafields: [
            { name: "name", type: "string" }
        ],
        url: "http://pokeapi.co/api/v2/pokemon/?limit=811"
    };
    var adaptadorDeDados_nomes = new $.jqx.dataAdapter(fonteDeDados_nomes);
    $("#jqxGrid_acaoPokemon_nome").jqxGrid(
    {
        width: "628px",
        height: "206px",
        theme: temaLocal,
        source: adaptadorDeDados_nomes,
        localization: ptBR_jqxGrid,
        sortable: false,
        pageable: true,
        autoheight: false,
        columnsresize: false,
        pagermode: "simple",
        pagesize: tamanhoDePagina,
        pagerbuttonscount: 5,
        columns: [
            { text: "Nome", datafield: "name", width: "628px" }
        ]
    });
    $("#jqxGrid_acaoPokemon_nome").on("rowselect", function (evento) 
    {
        if (evento.args !== null && evento.args.row !== null)
        {
            $("#p_acaoPokemon_nomeSelecionado").text("Nome Selecionado: " + evento.args.row.name);
        }
    });
    var fonteDeDados_habilidades =
    {
        datatype: "json",
        datafields: [
            { name: "name", type: "string" }
        ],
        url: "http://pokeapi.co/api/v2/move/?limit=639"
    };
    var adaptadorDeDados_habilidades = new $.jqx.dataAdapter(fonteDeDados_habilidades);
    $("#jqxGrid_acaoPokemon_habilidades").jqxGrid(
    {
        width: "628px",
        height: "206px",
        theme: temaLocal,
        source: adaptadorDeDados_habilidades,
        localization: ptBR_jqxGrid,
        selectionmode: "multiplerowsextended",
        sortable: false,
        pageable: true,
        autoheight: false,
        columnsresize: false,
        pagermode: "simple",
        pagesize: tamanhoDePagina,
        pagerbuttonscount: 5,
        columns: [
            { text: "Habilidade", datafield: "name", width: "628px" }
        ]
    });
    $("#jqxGrid_acaoPokemon_habilidades").on("rowselect", function (evento) 
    {
        if (evento.args !== null && evento.args.row !== null)
        {
            var itensDisponiveis = $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("getItems");
            var jaTem = false;
            if (itensDisponiveis !== undefined)
            {
                for (var i = 0; i < itensDisponiveis.length; ++i)
                    if (itensDisponiveis[i].label === evento.args.row.name)
                    {
                        jaTem = true;
                        break;
                    }
            }
            if (!jaTem)
                $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("addItem", evento.args.row.name);
            $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("selectItem", evento.args.row.name);
        }
    });
    $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox({ width: "628px", height: "28px", theme: temaLocal, autoDropDownHeight: true, multiSelect: true });

    $("#jqxButton_acaoPokemon_acao").jqxButton({ width: "120px", height: "36px", theme: temaLocal });

    $("#jqxButton_criarTime").on("click", function (evento)
    {
        centralizarJanela("#jqxWindow_criarTime");
        $("#jqxInput_criarTime_nomeDoTime").jqxInput("val", "");
        $("#jqxWindow_criarTime").jqxWindow("open");
    });

    $("#jqxButton_criarTime_criar").on("click", function (evento)
    {
        var nomeDoTime = $("#jqxInput_criarTime_nomeDoTime").val();
        if (nomeDoTime === "")
        {
            alert("Especifique um nome.");
        }
        else
        {
            var itens = $("#jqxDropDownList_times").jqxDropDownList("getItems");
            var numeroDeItens = itens.length;
            var nomeDuplicado = false;
            for (var i = 0; i < numeroDeItens; ++i)
                if (itens[i].label === nomeDoTime)
                {
                    nomeDuplicado = true;
                    break;
                }
            if (nomeDuplicado)
                alert("O nome fornecido já está em uso.");
            else
            {
                $("#jqxButton_criarTime_criar").jqxButton({ disabled: true });
                $.ajax({ type: "POST", url: "pCriarTime", data: { sessao: sessaoAtual, nomeDoTime: nomeDoTime }, dataType: "text", async: false })
                .done(function (resposta)
                {
                    if (resposta === "sucesso")
                    {
                        pokemonsAtuais[nomeDoTime] = [];
                        timeAtual = nomeDoTime;
                        $("#jqxDropDownList_times").jqxDropDownList("addItem", nomeDoTime);
                        $("#jqxDropDownList_times").jqxDropDownList("selectIndex", numeroDeItens);
                        $("#espacoDeEdicaoDeTime").show();
                        $("#jqxWindow_criarTime").jqxWindow("close");
                    }
                })
                .fail(function ()
                {
                    alert("Não foi possível contactar o servidor.");
                });
                $("#jqxButton_criarTime_criar").jqxButton({ disabled: false });
            }
        }
    });

    $("#jqxButton_excluirTime").on("click", function (evento)
    {
        if ($("#jqxDropDownList_times").jqxDropDownList("getItems").length === 0)
            alert("A lista de times está vazia.");
        else
        {
            $("#jqxButton_excluirTime").jqxButton({ disabled: true });
            var nomeDoTime = $("#jqxDropDownList_times").jqxDropDownList("val");
            $.ajax({ type: "POST", url: "pExcluirTime", data: { sessao: sessaoAtual, nomeDoTime: nomeDoTime }, dataType: "text", async: false })
            .done(function (resposta)
            {
                if (resposta === "sucesso")
                {
                    var indiceSelecionado = $("#jqxDropDownList_times").jqxDropDownList("getSelectedIndex");
                    delete pokemonsAtuais[timeAtual];
                    $("#jqxDropDownList_times").jqxDropDownList("removeAt", indiceSelecionado);
                    $("#jqxDropDownList_times").jqxDropDownList("clearSelection");
                }
            })
            .fail(function ()
            {
                alert("Não foi possível contactar o servidor.");
            });
            if ($("#jqxDropDownList_times").jqxDropDownList("getItems").length > 0)
                $("#jqxDropDownList_times").jqxDropDownList({ placeHolder: "Selecione um time" });
            else
            {
                $("#jqxDropDownList_times").jqxDropDownList({ placeHolder: "Lista de times vazia" });
                $("#espacoDeEdicaoDeTime").hide();
            }
            $("#jqxListBox_pokemons").jqxListBox("clear");
            $("#jqxButton_excluirTime").jqxButton({ disabled: false });
        }
    });

    $("#jqxDropDownList_times").on("select", function (evento)
    {
        $("#jqxListBox_pokemons").jqxListBox("clear");
        timeAtual = $("#jqxDropDownList_times").jqxDropDownList("getSelectedItem").label;
        for (var i = 0; i < pokemonsAtuais[timeAtual].length; ++i)
        {
            var valorAtual = pokemonsAtuais[timeAtual][i];
            var elementosAtuais = pokemonsAtuais[timeAtual][i].split('\n');
            $("#jqxListBox_pokemons").jqxListBox("addItem",
            {
                value: valorAtual,
                html: "<div><strong>" + elementosAtuais[0] + "</strong></div><div>Habilidades: <em>" + elementosAtuais[1] + "</em></div>"
            });
        }
    });

    $("#jqxButton_adicionarPokemon").on("click", function (evento)
    {
        var itensNaListaDePokemons = $("#jqxListBox_pokemons").jqxListBox("getItems");
        if (itensNaListaDePokemons === undefined)
            itensNaListaDePokemons = 0;
        if (itensNaListaDePokemons.length === 6)
            alert("A lista de Pokémon está cheia.\nNão se pode ter mais do que 6 Pokémons.");
        else
        {
            $("#jqxGrid_acaoPokemon_nome").jqxGrid("clearselection");
            $("#jqxGrid_acaoPokemon_nome").jqxGrid("gotopage", 0);

            $("#p_acaoPokemon_nomeSelecionado").text("Nome Selecionado:");

            $("#jqxGrid_acaoPokemon_habilidades").jqxGrid("clearselection");
            $("#jqxGrid_acaoPokemon_habilidades").jqxGrid("gotopage", 0);

            $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("clearSelection");
            $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("clear");
            corrigirComboBox("#jqxComboBox_acaoPokemon_habilidades");

            $("#jqxButton_acaoPokemon_acao").jqxButton("val", "Adicionar");

            centralizarJanela("#jqxWindow_acaoPokemon");
            $("#jqxWindow_acaoPokemon").jqxWindow("title", "Novo Pokemon");
            $("#jqxWindow_acaoPokemon").jqxWindow("open");
        }
    });

    $("#jqxButton_excluirPokemon").on("click", function (evento)
    {
        var pokemonSelecionado = $("#jqxListBox_pokemons").jqxListBox("getSelectedItem");
        if (pokemonSelecionado !== null && pokemonSelecionado !== undefined)
        {
            var indiceSelecionado = $("#jqxListBox_pokemons").jqxListBox("getSelectedIndex");
            pokemonsAtuais[timeAtual].splice(indiceSelecionado, 1);
            $("#jqxListBox_pokemons").jqxListBox("removeItem", pokemonSelecionado);
        }
    });

    $("#jqxButton_editarPokemon").on("click", function (evento)
    {
        pokemonSelecionadoAntesDeEditar = $("#jqxListBox_pokemons").jqxListBox("getSelectedItem");
        if (pokemonSelecionadoAntesDeEditar !== null && pokemonSelecionadoAntesDeEditar !== undefined)
        {
            var valoresSeparados = pokemonSelecionadoAntesDeEditar.value.split('\n');
            var nomeDoPokemonSelecionado = valoresSeparados[0];
            var habilidadesDoPokemonSelecionado = valoresSeparados[1].split(", ");

            var nomesNaLista = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getrows");
            var i;
            for (i = 0; i < nomesNaLista.length; ++i)
            {
                var nomeAtual = $("#jqxGrid_acaoPokemon_nome").jqxGrid("getcellvalue", i, "name");
                if (nomeAtual === nomeDoPokemonSelecionado)
                    break;
            }
            $("#jqxGrid_acaoPokemon_nome").jqxGrid("selectrow", i);
            $("#jqxGrid_acaoPokemon_nome").jqxGrid("gotopage", Math.floor(i / tamanhoDePagina));

            $("#jqxGrid_acaoPokemon_habilidades").jqxGrid("clearselection");
            $("#jqxGrid_acaoPokemon_habilidades").jqxGrid("gotopage", 0);

            $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("clear");
            for (i = 0; i < habilidadesDoPokemonSelecionado.length; ++i)
            {
                $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("addItem", habilidadesDoPokemonSelecionado[i]);
                $("#jqxComboBox_acaoPokemon_habilidades").jqxComboBox("selectIndex", i);

            }
            corrigirComboBox("#jqxComboBox_acaoPokemon_habilidades");

            $("#jqxButton_acaoPokemon_acao").jqxButton("val", "Salvar");

            centralizarJanela("#jqxWindow_acaoPokemon");
            $("#jqxWindow_acaoPokemon").jqxWindow("title", "Editar Pokemon");
            $("#jqxWindow_acaoPokemon").jqxWindow("open");
        }
    });

    $("#jqxButton_acaoPokemon_acao").on("click", function (evento)
    {
        if ($("#jqxButton_acaoPokemon_acao").val() === "Adicionar")
            adicionarPokemon();
        else
            editarPokemon();
    });

    $("#espacoDeEdicaoDeTime").hide();

    finalizarBase();
});
