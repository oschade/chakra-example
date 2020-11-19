import { SystemState, SystemActionTypes } from './types'

// Initial State
const initialState: SystemState = {
  userName: 'Olli',
}

// Reducers (Modifies The State And Returns A New State)
export default (
  state = initialState,
  action: SystemActionTypes
): SystemState => {
  return state
}
