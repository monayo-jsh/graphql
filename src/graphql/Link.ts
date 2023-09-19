import { extendType, idArg, intArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
    },
});

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return context.prisma.link.findMany();
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
                const { description, url } = args

                const newLink = context.prisma.link.create({
                    data: {
                        description: description,
                        url: url
                    }
                })

                return newLink;
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
                const { id, description, url } = args
                
                const updateLink = context.prisma.link.update({
                    where: {
                        id: id
                    },
                    data: {
                        description: description,
                        url: url
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
                const { id } = args
                
                const deleteLink = context.prisma.link.delete({
                    where: {
                        id: id
                    }
                })

                return deleteLink
            }
        })
    },
})