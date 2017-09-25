import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { rxify } from 'apollo-client-rxjs'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql',
  }),
})


const emptyVariables = {
  emptyVariables: true,
}
const watchQuery = (query, variables) => {
  return rxify(client.watchQuery)({

    // alternatives: "cache-first" | "cache-and-network" | "network-only" | "cache-only" | "standby"
    fetchPolicy: 'network-only', // every request goes to the graphql
    
    query,
    variables,
  })
}

export const query = (query, variables = emptyVariables) => {
  return watchQuery(query, variables)
}

export const mutation = (mutation, variables = emptyVariables) => {
  return watchQuery(mutation, variables)
}
