export const UPDATE_USERNAME = 'UPDATE_USERNAME'

export interface SystemState {
  userName: string
}

export interface UpdateUsernameAction {
  type: typeof UPDATE_USERNAME
  payload: Partial<SystemState>
}

export type SystemActionTypes = UpdateUsernameAction
