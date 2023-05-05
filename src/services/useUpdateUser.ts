/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { db } from './firebase'
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore'

type UserType = {
  uid: string
  firstName: string
  lastName: string
  companyName: string
  spaceCount: string
}
export const useUpdateUser = () => {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()
  const updateUser = async (user: UserType) => {
    try {
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
        })
        setSuccess(res)
      } else {
        setSuccess(docs)
      }
    } catch (err) {
      console.error(err)
      setError(err)
      setLoading(false)
    }
  }
  return [updateUser, loading, success, error]
}
