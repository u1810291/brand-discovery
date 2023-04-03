import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/compat/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { mapUserData } from '../../services/auth/useUser'
import { setUserCookie } from '../../services/auth'

export function Home() {
  const [widget, setWidget] = useState(null)
  const config: any = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.default.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
      firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
        const userData = await mapUserData(user)
        setUserCookie(userData)
      },
    },
  }
  useEffect(() => {
    setWidget(<StyledFirebaseAuth uiConfig={config} firebaseAuth={firebase.default.auth()} />)
  }, [])

  return <div>{widget}</div>
}
