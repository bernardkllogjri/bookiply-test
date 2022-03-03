export const buildRequest = (options: { [x: string]: string | number }) => {
  return Object.keys(options).reduce((acc, key, ix) => {
    if(ix === 0) return `${acc}?_${key}=${options[key]}`
    return `${acc}&${key}=${options[key]}`
  }, '')
}