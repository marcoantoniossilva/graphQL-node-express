var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
// GraphQL schema
var schema = buildSchema(`
    type Query {
      funcionarios: [Funcionario]
      funcionarioById(id: Int!): Funcionario,
      funcionariosByFuncao(funcao: String): [Funcionario],
      funcionariosBySetor(setor: String): [Funcionario],
      setor: Setor,
      funcao: Funcao,
    },
    type Funcionario {
      id: Int!
      nome: String!
      salario: Float!
      telefone: String
      setor: Setor
      funcao: Funcao!
      meta: Float
      comissao: Float
    },
    type Funcao {
      nomeFuncao: String!
    }
    type Setor {
      nomeSetor: String!
    }
`);

var funcionarios = [
  {
    id: 1,
    nome: "Ana",
    salario: 5000.0,
    telefone: "(77) 9 8888-8888",
    funcao: { nomeFuncao: "Gerente de Vendas" },
    setor: { nomeSetor: "Vendas" },
  },
  {
    id: 2,
    nome: "Luiz",
    salario: 1045.0,
    telefone: "(77) 9 9999-9999",
    funcao: { nomeFuncao: "Vendedor" },
    setor: { nomeSetor: "Vendas" },
  },
  {
    id: 3,
    nome: "Paulo",
    salario: 1045.0,
    telefone: "(77) 9 7777-7777",
    funcao: { nomeFuncao: "Representante" },
    setor: { nomeSetor: "Vendas" },
    comissao: 5,
  },
  {
    id: 4,
    nome: "João",
    salario: 4000.0,
    telefone: "(77) 9 6666-6666",
    funcao: { nomeFuncao: "Gerente de producao" },
    setor: { nomeSetor: "Produção" },
  },
  {
    id: 5,
    nome: "Augusto",
    salario: 1200.0,
    telefone: "(77) 9 5555-5555",
    funcao: { nomeFuncao: "Operador" },
    setor: { nomeSetor: "Produção" },
    meta: 2200,
  },
  {
    id: 6,
    nome: "Rafael",
    salario: 1100.0,
    telefone: "(77) 9 4444-4444",
    funcao: { nomeFuncao: "Embalador" },
    setor: { nomeSetor: "Produção" },
    meta: 4400,
  },
];

var getFuncionarios = function () {
  return funcionarios;
};

var getFuncionariosByFuncao = function (args) {
  var funcao = args.funcao;
  return funcionarios.filter(
    (funcionario) => funcionario.funcao.nomeFuncao === funcao
  );
};

var getFuncionariosBySetor = function (args) {
  var setor = args.setor;
  return funcionarios.filter(
    (funcionario) => funcionario.setor.nomeSetor === setor
  );
};

var getFuncionarioById = function (args) {
  var id = args.id;
  return funcionarios.filter((funcionario) => {
    return funcionario.id == id;
  })[0];
};

var root = {
  funcionarios: getFuncionarios,
  funcionarioById: getFuncionarioById,
  funcionariosByFuncao: getFuncionariosByFuncao,
  funcionariosBySetor: getFuncionariosBySetor,
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
