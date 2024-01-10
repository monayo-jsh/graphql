  const resolvers = {
    Query: {
        books: (parent, args, context, info) => {
          console.log("parent", parent)
          console.log("args", args)
          console.log("context", context)
          console.log("info", info)

          const books = [...Array(10)].map((data, index) => { return { title: `title-${index}`, author: `author-${index}`}})

          return {
            total: books.length,
            count: books.length,
            offset: 0,
            list: books
          }
        }
    }
  }

  module.exports = {
    resolvers: resolvers
  }