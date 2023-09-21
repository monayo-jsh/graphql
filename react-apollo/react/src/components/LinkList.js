import React from "react";
import Link from "./Link"
import { useQuery, gql } from "@apollo/client"

const QUERY_FEED = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        description
        url
      }
    }
  }
`

const LinkList = () => {
    const { data } = useQuery(QUERY_FEED)

    return (
        <div>
            {
                data && (
                    <>
                        {
                            data.feed.links.map((link) => (
                                <Link key={link.id} link={link} />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default LinkList