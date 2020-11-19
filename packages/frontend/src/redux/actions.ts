import { useDispatch } from 'react-redux'
import * as nodeActions from './node/actions'
import * as systemActions from './system/actions'

// type ActionType = typeof nodeActions

export const actions = {
  ...nodeActions,
  ...systemActions,
}

// error see:
// https://stackoverflow.com/questions/53855624/using-typescript-returntype-with-keyof-and-iterated-keys-of-generic-type
function wrapWithUse<
  T extends typeof actions,
  U extends {
    [key in keyof T]: T[key] extends (...args: any) => any
      ? () => (...args: Parameters<T[key]>) => ReturnType<T[key]>
      : never
  }
>(allActions: T): U {
  const actionNames = Object.keys(allActions)
  const newActions: any = {}

  actionNames.forEach((actionName) => {
    newActions[actionName] = () => {
      const dispatch = useDispatch()
      return (...props) => dispatch(allActions[actionName].apply(null, props))
    }
  })

  return newActions
}

export const useAction = wrapWithUse(actions)
