import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import socketsReducer from './socketsReducer'
import playerReducer from './playerReducer'

const rootReducer = combineReducers({
    playerReducer,
    socketsReducer,
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))
