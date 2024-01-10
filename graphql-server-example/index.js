const { ApolloServer, mergeSchemas } = require('apollo-server');

async function startApolloServer() {

    //get schemas
    const { schemas } = require("./schemas/schemas")

    //get resolvers
    const { resolvers } = require("./resolvers/resolvers")

    //merge Schemas
    const schema = mergeSchemas({
        schemas,
        resolvers
    })

    const server = new ApolloServer({
        schema
    })

    await server.listen()

    console.log(`🚀 Server ready at http://localhost:4000`);
}

startApolloServer()