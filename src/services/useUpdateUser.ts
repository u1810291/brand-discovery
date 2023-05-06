/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from './firebase'
import { useState } from 'react'
import { query, getDocs, collection, where, addDoc, updateDoc } from 'firebase/firestore'

export type UserType = {
  uid: string
  firstName?: string
  lastName?: string
  companyName?: string
  spaceCount?: string
  email?: string
}

export const useUpdateUser = () => {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()

  const updateUser = async (user: UserType) => {
    try {
      setLoading(true)
      const q = query(collection(db(), 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        const res = await addDoc(collection(db(), 'users'), {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          spaceCount: user.spaceCount,
          createdAt: new Date(),
          updatedAt: new Date(),
          modalShown: false,
          likesUpdated: null,
          likesLeft: 50,
          dailyLikesGranted: false,
          dailyLikesleft: null,
        })
        setSuccess(res)
      } else {
        // check if 24 hours have passed since last likes update
        const now = new Date()
        const lastUpdate = docs.docs[0].data().likesUpdated?.toDate()
        const diff = now?.getTime() - lastUpdate?.getTime()
        const hoursDiff = diff / (1000 * 60 * 60)

        const updatedData = {
          uid: user.uid,
          ...(user.firstName && { firstName: user.firstName }),
          ...(user.lastName && { lastName: user.lastName }),
          ...(user.companyName && { companyName: user.companyName }),
          ...(user.email && { email: user.email }),
          ...(user.spaceCount && { spaceCount: user.spaceCount }),
          updatedAt: now,
          modalShown: false,
          likesLeft: docs.docs[0].data().likesLeft,
          dailyLikesGranted: docs.docs[0].data().dailyLikesGranted,
          dailyLikesleft: docs.docs[0].data().dailyLikesleft,
          likesUpdated: hoursDiff >= 24 ? now : docs.docs[0].data().likesUpdated,
        }
        await updateDoc(docs.docs[0].ref, updatedData)
        setSuccess(updatedData)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return [updateUser, loading, success, error] as const
}
