import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

// reducer
import systemReducer from './system/reducer'
import nodeReducer from './node/reducer'

// actions

// import * as systemActions from './system/actions'
// import * as chatActions from './chat/actions'
// import * as sequenceActions from './sequence/actions'
// import * as timelineActions from './timeline/actions'

// export const actions = {
//   ...systemActions,
//   ...chatActions,
//   ...sequenceActions,
//   ...timelineActions,
// }

const rootReducer = combineReducers({
  system: systemReducer,
  node: nodeReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Redux: Store
export const store = createStore(rootReducer, applyMiddleware(createLogger()))

// Exports
// export * from './selectors'
export * from './actions'
