export function getAuth(_this) {
  const { authType, authName } = _this.config

  if (authType === 'cookie') {
    let strCookie = document.cookie
    let arrCookie = strCookie.split('; ')
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split('=')
      if (arr[0] === authName) return arr[1]
    }
    return ''
  }
  if (authType === 'sessionStorage') {
    const auth = sessionStorage.getItem(authName)
    return auth
  }
  if (authType === 'localStorage') {
    const auth = localStorage.getItem(authName)
    return auth
  }

  if (authType === 'none') {
    return ''
  }
}
