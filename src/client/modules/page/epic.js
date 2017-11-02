import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import { ACTION_TYPES } from './page'
import { notFound } from '../router'


const checkIfPageExists$ = (action$, store, ssr) => action$
  .ofType(ACTION_TYPES.CHECK_IF_PAGE_EXISTS$)
  .switchMap(action => {
    return ssr.observe(action,
      Observable.of(action)
        .map(() => {
          /*
           * implement your own logic
           */
          const data = null
          return data
        })
        .map(data => {
          if (!data)
            return notFound()
          else
            return { type: 'empty' }
        }))
  })


export default combineEpics(
  checkIfPageExists$
)
