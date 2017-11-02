import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { rxify } from 'apollo-client-rxjs'
import { Observable } from 'rxjs'
import { isProduction } from '../env'
import { notFound } from '../../modules/router'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    // TODO: insert live url
    uri: isProduction()
      ? 'http://localhost:4000/graphql'
      : 'http://localhost:4000/graphql',
  }),
})

export const handleErrors = observable => {
  return observable.catch(e => {
    return Observable.of(Object.assign(notFound(), {
      payload: e,
      error: true,
    }))
  })
}

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
