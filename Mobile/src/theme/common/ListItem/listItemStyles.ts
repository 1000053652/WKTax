// util functions to calculate right style prop
type widthType = number | string

export const getRelPercWidth = (w1: string, w2: string) => {
  if (w1 === 'auto' || w2 === 'auto') return 'auto'
  const f1 = parseFloat(w1)
  const f2 = parseFloat(w2)
  return `${((f1 * 100) / f2).toFixed(1)}%`
}

export const chooseWidthV = (w1: widthType, w2: widthType) => {
  // when 2 elements are arranged in column
  const t1 = typeof w1
  const t2 = typeof w2
  if (w1 === 'auto' || w2 === 'auto') return 'auto'
  else if (t1 === 'string' && t2 === 'string') {
    return parseFloat(w1 as string) > parseFloat(w2 as string) ? w1 : w2
  } else if (t1 === 'number' && t2 === 'number')
    return Math.max(w1 as number, w2 as number)
  else return 'auto' // both length need to be of same type
}

export const chooseMinWidthV = (w1: widthType, w2: widthType) => {
  // when 2 elements are arranged in column
  const t1 = typeof w1
  const t2 = typeof w2
  if (w1 === 'auto' && w2 === 'auto') return 'auto'
  else if (w1 === 'auto') return w2
  else if (w2 === 'auto') return w1
  else if (t1 === 'string' && t2 === 'string') {
    return parseFloat(w1 as string) < parseFloat(w2 as string) ? w1 : w2
  } else if (t1 === 'number' && t2 === 'number')
    return Math.min(w1 as number, w2 as number)
  else return w1 // simply return first, if of different type
}

export const chooseWidthH = (w1: widthType, w2: widthType) => {
  // when 2 elements are arranged in row
  const t1 = typeof w1
  const t2 = typeof w2
  if (w1 === 'auto' || w2 === 'auto') return 'auto'
  else if (t1 === 'string' && t2 === 'string') {
    return `${parseFloat(w1 as string) + parseFloat(w2 as string)}%`
  } else if (t1 === 'number' && t2 === 'number')
    return (w1 as number) + (w2 as number)
  else return 'auto' // both length need to be of same type
}

export const chooseMinWidthH = (w1: widthType, w2: widthType) => {
  // when 2 elements are arranged in row
  const t1 = typeof w1
  const t2 = typeof w2
  if (w1 === 'auto' && w2 === 'auto') return 'auto'
  else if (w1 === 'auto') return w2
  else if (w2 === 'auto') return w1
  else if (t1 === 'string' && t2 === 'string') {
    return `${parseFloat(w1 as string) + parseFloat(w2 as string)}%`
  } else if (t1 === 'number' && t2 === 'number')
    return (w1 as number) + (w2 as number)
  else return w1 // simply return first, if of different type
}
