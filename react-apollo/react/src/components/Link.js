import React from "react";
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants'
import { timeDifferenceForDate } from "../utils";
import { gql, useMutation } from '@apollo/client'
import { QUERY_FEED } from './LinkList'

const MUTATION_VOTE = gql`
    mutation mutationVote($linkId: ID!) {
        vote(linkId: $linkId) {
        id
        link {
            id
            votes {
            id
            user {
                id
            }
            }
        }
        user {
            id
        }
        }
    }
`

const Link = (props) => {
    const { link } = props
    const { url, description } = link
    const authToken = localStorage.getItem(AUTH_TOKEN)
    
    const take = LINKS_PER_PAGE
    const skip = 0
    const orderBy = { createdAt: 'desc' }

    const [vote] = useMutation(MUTATION_VOTE, {
        variables: {
            linkId: link.id
        },
        update: (cache, {data: {vote}}) => {
            const { feed } = cache.readQuery({
                query: QUERY_FEED,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })

            const updatedLinks = feed.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    }
                }
                return feedLink
            })

            cache.writeQuery({
                query: QUERY_FEED,
                data: {
                    feed: {
                        links: updatedLinks
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })
        }
    })

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
            <span className="gray">{props.index + 1}.</span>
            {authToken && (
                <div
                    className="ml1 gray f11"
                    style={{ cursor: 'pointer' }}
                    onClick={vote}
                >
                ▲
                </div>
            )}
            </div>
            <div className="ml1">
            <div>
                {link.description} ({link.url})
            </div>
            {(
                <div className="f6 lh-copy gray">
                    {link.votes.length} votes | by{' '}
                    {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(link.createdAt)}
                </div>
            )}
            </div>
        </div>
    )
}

export default Link