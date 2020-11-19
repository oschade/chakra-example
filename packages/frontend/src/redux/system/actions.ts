import { SystemState, SystemActionTypes } from './types'

export function updateUsername(
  payload: Partial<SystemState>
): SystemActionTypes {
  return {
    type: 'UPDATE_USERNAME',
    payload,
  }
}
