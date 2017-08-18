Pokélinia
=========

Pokélinia é uma aplicação Web que permite gerenciar times de Pokémons.

Esta aplicação é composta por um lado cliente e um lado servidor. No lado
cliente, a ferramenta de build usada é o *gulp*, mas a pasta "build" já
contém a saída do gulp, pronta para o servidor usar. Já o lado do servidor
requer Node.js.

Configurando no Windows
-----------------------

1. Vá para http://www.nodejs.org e baixe e instale Node.js versão 6.
Outras versões do Node.js não foram testadas.

2. Abra o prompt de comando e navegue até a pasta 'servidor'.
Por exemplo, se você baixou o repositório para `C:\Projetos\pokelinia`
então digite `cd C:\Projetos\pokelinia\servidor`.

3. Execute o comando `node main.js`.

4. O site deve funcionar sem uma URL muito detalhada, então acesse
`localhost` no seu navegador. Se qualquer coisa não der certo,
acesse `http://localhost:80/index.html`.

5. Use o site à vontade.

6. Quando terminar, dê um Ctrl+C no prompt de comando no qual você
iniciou o servidor.

Configurando no Linux
---------------------

Tive problemas relacionados à obtenção de pacotes no Linux (o apt-get não
está conseguindo baixar alguns pacotes de servidores brasileiros), mas
teoricamente as instruções abaixo são "ideais".

1. Se você não já tem, instale curl para poder instalar Node.js, assim:
`sudo apt-get install curl`

2. Para instalar o Node.js, os seguintes comandos são para Ubuntu:

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash bash -
sudo apt-get install -y nodejs
```

3. Abra o terminal e navegue até a pasta 'servidor'.
Por exemplo, se você baixou o repositório para `~/Projetos/pokelinia`
então digite `cd ~/Projetos/pokelinia/servidor`.

4. Execute o comando `node main.js`.

5. O site deve funcionar sem uma URL muito detalhada, então acesse
`localhost` no seu navegador. Se qualquer coisa não der certo,
acesse `http://localhost:80/index.html`.

6. Use o site à vontade.

7. Quando terminar, dê um Ctrl+C no terminal no qual você
iniciou o servidor.

Observação
----------

Atualmente, o servidor grava o conteúdo do banco de dados em memória,
não em um arquivo, então após fechar o servidor, o banco de dados é
zerado. Isso facilita testes, mas é claro que isso não seria feito
em produção.

Licença
-------

Todo o código de Pokélinia é disponibilizado sob a licença Affero General
Public License v3, mas ressalta-se que há softwares de terceiros neste
repositório, eles possuem suas próprias licenças (jQuery usa a licença MIT,
por exemplo). A licença completa do Pokélinia (ou seja, a AGPLv3) encontra-se
no arquivo `COPYING`. Um dos softwares de terceiros utilizados por Pokélinia
é a biblioteca de interface gráfica *jQWidgets*, que é pago, e eu não possuo
uma licença comercial para ele, estou usando a versão gratuita, então Pokélinia
não pode ser usado comercialmente. Lembre-se de que propagandas em site gratuito
caracteriza-se como uso comercial.

A imagem do Pikachu na primeira página foi adquirida da página DeviantArt do
usuário elfaceitoso: https://elfaceitoso.deviantart.com/art/Pikachu-Shiny-137354049
