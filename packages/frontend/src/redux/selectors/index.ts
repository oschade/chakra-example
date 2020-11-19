// import { useCallback, useMemo } from 'react'
// import { useSelector as useSelect } from 'react-redux'
// import * as nodeSelectors from './node'

// export const selectors = {
//   ...nodeSelectors,
// }

// type SelectorType = typeof selectors
// type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
//   ? (...args: P) => R
//   : never

// // error see:
// // https://stackoverflow.com/questions/53855624/using-typescript-returntype-with-keyof-and-iterated-keys-of-generic-type
// function wrapWithUse<
//   T extends SelectorType,
//   U extends {
//     [key in keyof T]: T[key] extends (...args: any) => any
//       ? (...args: Parameters<OmitFirstArg<T[key]>>) => ReturnType<T[key]>
//       : never
//   }
// >(slcts: T): U {
//   const selectorNames = Object.keys(slcts)
//   const newSelectors: any = {}

//   selectorNames.forEach((name) => {
//     newSelectors[name] = (props) =>
//       useSelect((state) => slcts[name](state, props))
//   })

//   return newSelectors
// }

// export const useSelector = wrapWithUse(selectors)
