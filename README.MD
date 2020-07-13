Este é um código destinado a ser executado no lado cliente, em que utilizará de uma API do HTML5, denominada IndexedDb, onde irá armazenar de maneira mais segura o TokenJWT, evitando assim a brecha de segurança XSS, que possibilita que quando utiliza-se do LocalStorage, o meio mais comum para armazenamento do token no lado cliente, outros sites possam acessar este token e ter as permissoes do usuario no backend.


Rodando o comando NPM install irá instalar as dependencias, com o comando npm start irá compilar o código dentro da pasta "./dist" em que será possivel utilizar do código em um cliente web, criar a classe SafeJwt passando como atributo o token.

Esta classe possui algumas funções de manipulação do token dentro da API do IndexedDb, tais como os métodos adicionaToken, deletarToken, buscaToken, atualizaToken. Métodos que possuem esses nomes devido a clareza para as suas funções primordiais.