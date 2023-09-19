import { extendType, idArg, intArg, nonNull, objectType, stringArg } from "nexus";

export const Link = objectType({
    name: "Link",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("description")
        t.nonNull.string("url")
        t.nonNull.dateTime("createdAt")
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
                const { prisma } = context
                return prisma.link.findUnique({ where: { id: parent.id } })
                                  .postedBy()
            }
        }),
        t.nonNull.list.nonNull.field("voters", {
            type: "User",
            resolve(parent, args, context) {
                const { prisma } = context
                return prisma.link.findUnique({ where: { id: parent.id }})
                                  .voters()
            }
        })
    },
});

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            args: {
                filter: stringArg()
            },
            resolve(parent, args, context) {
                let where = {}
                
                const { filter } = args
                if (filter) {
                    where = {
                        OR: [
                            { description: { contains: filter } },
                            { url: { contains: filter } }
                        ]
                    }
                }

                const { prisma } = context
                return prisma.link.findMany({
                    where
                })
            }
        })
    }
})

export const LinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const { prisma, userId } = context
                
                if (!userId) {
                    throw new Error("Cannot post without logging in.")
                }

                const { description, url } = args

                const newLink = prisma.link.create({
                    data: {
                        description: description,
                        url: url,
                        postedBy: { connect: { id: userId } }
                    }
                })

                return newLink
            }
        }),
        t.nonNull.field("updateLink", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const { prisma, userId } = context
                
                if (!userId) {
                    throw new Error("Cannot post without logging in.")
                }

                const { id, description, url } = args

                const updateLink = prisma.link.update({
                    where: {
                        id: id
                    },
                    data: {
                        description: description,
                        url: url,
                        postedBy: { connect: { id: userId } }
                    }
                })

                return updateLink
            }
        }),
        t.nonNull.field("deleteLink", {
            type: "Link",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context) {
                const { prisma, userId } = context
                
                if (!userId) {
                    throw new Error("Cannot post without logging in.")
                }

                const { id } = args
                
                const deleteLink = prisma.link.delete({
                    where: {
                        id: id
                    }
                })

                return deleteLink
            }
        })
    },
})