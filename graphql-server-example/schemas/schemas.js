const { makeExecutableSchema } = require("apollo-server");
const { importSchema } = require("graphql-import");

const Book = importSchema("./schemas/graphql/Book.graphql")
const Car = importSchema("./schemas/graphql/Car.graphql")
const User = importSchema("./schemas/graphql/User.graphql")

const schemas = [
    makeExecutableSchema({typeDefs: `${Book}`}),
    makeExecutableSchema({typeDefs: `${Car}`}),
    makeExecutableSchema({typeDefs: `${User}`})
]

module.exports = {
    schemas: schemas
}