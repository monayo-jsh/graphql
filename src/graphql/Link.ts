import { Prisma } from "@prisma/client"
import { enumType, extendType, idArg, inputObjectType, intArg, nonNull, objectType, stringArg, arg, list} from "nexus"

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
})

export const LinkOrderByInput = inputObjectType({
    name: "LinkOrderByInput",
    definition(t) {
        t.field("description", { type: Sort })
        t.field("url", { type: Sort })
        t.field("createdAt", { type: Sort })
    },
})

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"]
})

export const Feed = objectType({
    name: "Feed",
    definition(t) {
        t.nonNull.list.nonNull.field("links", { type: Link })
        t.nonNull.int("count")
        t.id("id")
    },
})

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("feed", {
            type: "Feed",
            args: {
                filter: stringArg(),
                skip: intArg(),
                take: intArg(),
                orderBy: arg({ type: list(nonNull(LinkOrderByInput)) })
            },
            async resolve(parent, args, context) {
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
                const links = await prisma.link.findMany({
                                                    where,
                                                    skip: args?.skip as number | undefined,
                                                    take: args?.take as number | undefined,
                                                    orderBy: args?.orderBy as Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput> | undefined
                                                })
                
                const count = await prisma.link.count({ where })
                const id = `main-feed:${JSON.stringify(args)}`

                return {
                    links,
                    count,
                    id
                }
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