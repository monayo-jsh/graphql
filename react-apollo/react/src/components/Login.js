import { useMutation, gql } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'

const MUTATION_SIGN_UP = gql`
    mutation mutationSignUp(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(
            email: $email
            password: $password
            name: $name
        ) {
            token
        }
    }
`

const MUTATION_LOGIN = gql`
    mutation mutationLogin(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email,
            password: $password
        ) {
            token
        }
    }
`
const Login = () => {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    })

    const [login] = useMutation(MUTATION_LOGIN, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token)
            navigate('/')
        }
    })
    
    const [signup] = useMutation(MUTATION_SIGN_UP, {
        variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token)
            navigate('/')
        }
    })
    

    return (
        <div>
            <h4 className='mv3'>
                {formState.login ? 'Login' : 'Sign Up'}
            </h4>
            <div className='flex flex-column'>
                {!formState.login && (
                    <input 
                        type='text'
                        value={formState.name}
                        placeholder='Your name'
                        onChange={(e) => setFormState({
                            ...formState,
                            name: e.target.value
                        })}
                    />
                )}
                <input
                    type='text'
                    value={formState.email}
                    placeholder='Your email address'
                    onChange={(e) => setFormState({
                        ...formState,
                        email: e.target.value
                    })}
                />
                <input
                    type='password'
                    value={formState.password}
                    placeholder='Choose a safe password'
                    onChange={(e) => {
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }}
                />
            </div>
            <div className='flex mt3'>
                <button 
                    className='pointer mr2 button'
                    onClick={formState.login ? login : signup }
                >
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button
                    className='pointer button'
                    onClick={(e) => setFormState({
                        ...formState,
                        login: !formState.login
                    })}
                >
                    {formState.login 
                        ? 'need to create an account'
                        : 'already have an account?'
                    }
                </button>
            </div>
        </div>
    )
}

export default Login