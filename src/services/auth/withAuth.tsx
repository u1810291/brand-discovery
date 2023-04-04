'use client'

import React, { useEffect } from 'react'
import router from 'next/router'
import * as firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import initFirebase from '../firebase'

initFirebase()
const auth = firebase.default.auth()

const withAuth = (Component) => (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push('/sign-in')
      }
    })
  }, [])

  return (
    <div>
      <Component {...props} />
    </div>
  )
}

export default withAuth
