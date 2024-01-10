  const resolvers = {
    Query: {
      me: (parent, args, context, info) => {
          console.log("parent", parent)
          console.log("args", args)
          console.log("context", context)
          console.log("info", info)

          const result = {
            id: "1",
            name: "name"
          }
          return result
        }
    }
  }

  module.exports = {
    resolvers: resolvers
  }