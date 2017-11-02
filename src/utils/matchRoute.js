import { matchRoutes } from 'react-router-config'
import { routes } from '../client/config/routes'


export const matchRoute = path => {
  const matchedRoutes = matchRoutes(routes, path)
  let _match = null
  matchedRoutes.forEach(match => {
    if (match.match.isExact === true) {
      _match = match.match
    }
  })
  return _match
}
