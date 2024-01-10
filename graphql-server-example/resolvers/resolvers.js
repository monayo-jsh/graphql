const Book = require("./resolver/Book")
const Car = require("./resolver/Car")
const User = require("./resolver/User")

const resolvers = [
    Book.resolvers,
    Car.resolvers,
    User.resolvers,
]

module.exports = {
    resolvers: resolvers
}