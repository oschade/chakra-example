export const compareByKey = (objA, objB, keys: string[]) => {
  if (!objA || !objB) {
    return objA === objB
  }

  return keys.every((key) => objA[key] === objB[key])
}

export const compareElementsOfArray = (
  arrA: unknown[],
  arrB: unknown[],
  method?: (elementA: unknown, elementB: unknown) => boolean
) => {
  if (arrA.length !== arrB.length) {
    return false
  }
  const meth = method || ((a, b) => a === b)

  return arrA.every((elementA, i) => {
    const elementB = arrB[i]

    return meth(elementA, elementB)
  })
}
