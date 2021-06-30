/**
 * Parse the url params into a javascript object.
 * */
export const getUrlParams = (): { [key: string]: string } => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {})
}
