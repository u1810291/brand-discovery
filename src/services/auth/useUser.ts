import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import initFirebase from '../firebase'
import { removeUserCookie, setUserCookie, getUserFromCookie } from './index'

initFirebase()

export const mapUserData = async (user) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}

const useUser = () => {
  const [user, setUser] = useState<Record<string, string>>()
  const router = useRouter()

  const logout = async () => {
    return firebase.default
      .auth()
      .signOut()
      .then(() => {
        router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  }
  useEffect(() => {
    const cancelAuthListener = firebase.default.auth().onIdTokenChanged(async (userToken) => {
      if (userToken) {
        const userData = await mapUserData(userToken)
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser({})
      }
    })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      return
    }
    setUser(userFromCookie)
    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, logout }
}

export { useUser }
