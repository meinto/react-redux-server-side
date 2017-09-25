import { matchRoutes } from 'react-router-config'
import type from 'type-detect'
import { routes } from '../../client/config/routes'


export default class SSR {
	
  constructor(location) {
    
    this.expectedActionTypes = []
    this.calledActionTypes = []

    this.actionCalled = () => {}
    
    this.epicsToCall = []
    const matchedRoutes = matchRoutes(routes, location)
    matchedRoutes.forEach(match => {
      if (match.match.isExact === true && match.route.epics)
        this.epicsToCall = [...match.route.epics]
    })
  }

  dispatchEpicActions = store => {
    if (store && this.epicsToCall && type(this.epicsToCall) === 'Array') {
      this.epicsToCall.forEach(action => {
        store.dispatch(action())
      })
    }
  }

  expected = actions => {
    // INFO: if we use thunk we have to modify this a bit...
    if (type(actions) === 'Array') {
      actions.forEach(action => {
        this.expectedActionTypes = [...this.expectedActionTypes, action.type]
      })
    } else if (type(actions) === 'Object') {
      this.expectedActionTypes = [...this.expectedActionTypes, actions.type]
    }

    return actions
  }

 call = (actionType) => {
   this.calledActionTypes = [...this.calledActionTypes, actionType]
   this.actionCalled(actionType)
 }

  middleware = () => {
    return store => next => action => { // eslint-disable-line

      this.call(action.type)

      next(action)
    }
  }

 checkForCompleation = () => {
   return this.expectedActionTypes.every(_called => {
     return this.calledActionTypes.indexOf(_called) > -1
   })
 }

 loadingComplete = async() => {
   return await new Promise(success => {

     if (this.epicsToCall && this.epicsToCall.length > 0) {
      this.actionCalled = actionType => { // eslint-disable-line
         if (this.checkForCompleation()) {
           success()
         }
       }
     } else {
       success()
     }

     setTimeout(() => {
       success()
     }, 1000)
   })
 }
}
