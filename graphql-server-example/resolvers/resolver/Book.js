  const resolvers = {
    Query: {
        books: (parent, args, context, info) => {
          console.log("parent", parent)
          console.log("args", args)
          console.log("context", context)
          console.log("info", info)

          //응답값 설정
          const books = [
            {
              title: 'The Awakening',
              author: 'Kate Chopin',
            },
            {
              title: 'City of Glass',
              author: 'Paul Auster',
            },
          ]
          return books
        }
    }
  }

  module.exports = {
    resolvers: resolvers
  }