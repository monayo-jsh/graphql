import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const MUTATION_CREATE_LINK = gql`
    mutation PostMutation(
        $description: String!
        $url: String!
    ) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`

const LinkCreate = () => {
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        description: '',
        url: ''
    })

    const [LinkCreate] = useMutation(MUTATION_CREATE_LINK, {
        variables: {
            description: formState.description,
            url: formState.url
        },
        onCompleted: () => navigate("/")
    })

    return (
        <div>
            
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    LinkCreate();
                }}
            >
                <div className="flex flex-column mt3">

                    <input
                        className="mb2"
                        type="text"
                        value={formState.description}
                        placeholder="A description for the link"
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                description: e.target.value
                            })
                        }}
                    />

                    <input
                        className="mb2"
                        type="text"
                        value={formState.url}
                        placeholder="The URL for the link"
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                url: e.target.value
                            })
                        }}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default LinkCreate