import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import { setContext } from '@apollo/client/link/context'

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split
} from '@apollo/client'

import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';

import { AUTH_TOKEN } from './constants';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
})

const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return (
        kind === 'OperationDefinition' && 
        operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)