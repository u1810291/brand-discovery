import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import initFirebase from '../../services/firebase'
import { setUserCookie } from '../../services/auth'
import { mapUserData } from '../../services/auth/useUser'
import { useEffect, useState } from 'react'
import { Home } from './widget'

initFirebase()
export const SignIn = () => {
  return (
    <div>
      <Home />
    </div>
  )
}
