const HOUR_IN_MILLISECONDS = 60 * 60 * 1000

export const setCookie = (
  cname: string,
  cvalue: string,
  exhours: number // hours
): void => {
  const d = new Date()
  d.setTime(d.getTime() + exhours * HOUR_IN_MILLISECONDS)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

export const getCookie = (cname: string): string => {
  const name = cname + '='

  // Decode the cookie string, to handle cookies with special characters, e.g. '$'
  const decodedCookie = decodeURIComponent(document.cookie)

  const cookieArray = decodedCookie.split(';')
  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
