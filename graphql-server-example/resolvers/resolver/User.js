const resolvers = {
  Query: {
    me: (parent, args, context, info) => {
        console.log("parent", parent)
        console.log("args", args)
        console.log("context", context)
        console.log("info", info)

        const users = [...Array(10)].map((i, index) => {return { id: index, name: `name-${index}` }})

        return users.find(user => user.id === args.id)
      }
  }
}

module.exports = {
  resolvers: resolvers
}