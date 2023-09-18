import { extendType, idArg, intArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.id("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
    },
});

let links: NexusGenObjects["Link"][] = [
    {
        id: "1",
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL",
    },
    {
        id: "2",
        url: "graphql.org",
        description: "GraphQL official website",
    },
]

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return links
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

                let idCount = links.length + 1;
                const link = {
                    id: String(idCount),
                    description: description,
                    url: url
                }
                links.push(link);
                return link;
            }
        }),
        t.nonNull.field("updateLink", {
            type: "Link",
            args: {
                id: nonNull(idArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const { id, description, url } = args

                let [findLink] = links.filter(link => link.id === id)
                    
                findLink.description = description
                findLink.url = url

                return findLink
            }
        }),
        t.nonNull.field("deleteLink", {
            type: "Link",
            args: {
                id: nonNull(idArg())
            },
            resolve(parent, args, context) {
                const { id } = args

                let deleteIndex = links.findIndex(link => link.id === id)

                const deleteLink = links[deleteIndex]
                links.splice(deleteIndex, 1)

                return deleteLink
            }
        })
    },
})