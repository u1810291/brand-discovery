'use client'

export const getUserFromCookie = () => {
  // const token = window && window?.localStorage?.getItem('auth');
  const token = 'asd'
  if (!token) {
    return
  }
  return JSON.parse(token)
}

export const setUserCookie = (user) => {
  return console.log('set user cookie')
  // return window && window?.localStorage?.setItem('auth', user);
}

export const removeUserCookie = () => console.log('remove')
// export const removeUserCookie = () => window && window?.localStorage?.setItem('auth', '');
