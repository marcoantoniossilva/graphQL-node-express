1 - Na pasta do projeto, rode o seguinte comando para criar um container Docker:

docker build -t node-debian9-graphql:1.0 .

2 - Execute o container mapeando a porta local 4000 para a porta do container 4000 com o comando:

docker run -p 4000:4000 node-debian9-graphql:1.0

3 - Abra o servidor GraphQL em node express que está rodando no endereço http://localhost:4000/graphql
e execute individualmente as consultas que estão no arquivo 'consultas.txt'.
