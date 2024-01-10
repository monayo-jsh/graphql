  const resolvers = {
    Query: {
        cars: () => [
          {
            name: 'k3',
            number: '12가1234',
          },
          {
            name: 'k5',
            number: '12가5678',
          },
          {
            name: 'k7',
            number: '12가0000',
          },
        ]
    }
  }

  module.exports = {
    resolvers: resolvers
  }