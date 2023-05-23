/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from './firebase'
import { useCallback, useState } from 'react'
import { updateEmail } from 'firebase/auth'
import { query, getDocs, collection, where, addDoc, updateDoc, getDoc, doc, setDoc } from 'firebase/firestore'

export type UserType = {
  uid: string
  firstName?: string
  lastName?: string
  companyName?: string
  spaceCount?: string
  email?: string
}

export const useUpdateUser = (auth) => {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()

  const updateUser = useCallback(async (user: UserType) => {
    try {
      setLoading(true)
      const q = query(collection(db(), 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        const res = await setDoc(doc(db(), 'users', user.email), {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          spaceCount: user.spaceCount,
          createdAt: new Date(),
          updatedAt: new Date(),
          modalShown: false,
          likesUpdated: null,
          likes: [],
          likesLeft: 50,
          dailyLikesGranted: false,
          dailyLikesLeft: null,
        })
        setSuccess(res)
      } else {
        // check if 24 hours have passed since last likes update
        const now = new Date()
        const lastUpdate = docs.docs[0].data().likesUpdated?.toDate()
        const diff = now?.getTime() - lastUpdate?.getTime()
        const hoursDiff = diff / (1000 * 60 * 60)

        if (user.email) {
          updateEmail(auth.currentUser, user.email)
            .then(() => {
              setSuccess('Email updated successfully!')
            })
            .catch((error) => {
              setError(error?.message?.split('/')[1])
              console.error(error)
            })
        }
        const updatedData = {
          uid: user.uid,
          ...(user.firstName && { firstName: user.firstName }),
          ...(user.lastName && { lastName: user.lastName }),
          ...(user.companyName && { companyName: user.companyName }),
          ...(user.email && { email: user.email }),
          ...(user.spaceCount && { spaceCount: user.spaceCount }),
          updatedAt: now,
          likes: docs.docs[0].data()?.likes || [],
          modalShown: docs.docs[0].data()?.modalShown || false,
          likesLeft: docs.docs[0].data()?.likesLeft || null,
          dailyLikesGranted: docs.docs[0].data()?.dailyLikesGranted || false,
          dailyLikesLeft: docs.docs[0].data().dailyLikesleft || null,
          likesUpdated: hoursDiff >= 24 ? now : docs.docs[0].data().likesUpdated || null,
        }
        await updateDoc(docs.docs[0].ref, updatedData)
        setSuccess(updatedData)
      }
    } catch (err) {
      console.error(err)
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }, [])
  return { updateUser, loading, success, error } as const
}

export const useGetUser = () => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState()
  const fetchUser = useCallback(async (uid) => {
    try {
      if (uid) {
        let docId
        const q = query(collection(db(), 'users'), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          docId = doc.id
        })
        const document = await getDoc(doc(collection(db(), 'users'), docId))
        setData(document.data())
      }
    } catch (err) {
      console.error(err)
      setError(err?.message)
    }
  }, [])
  return [fetchUser, data, error] as const
}
