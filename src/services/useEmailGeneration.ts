import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback } from 'react'
import { useAppDispatch } from 'src/store'
import { openModal } from 'src/store/slices/modal'
import { db } from './firebase'
import emailjs from 'emailjs-com'
import 'firebase/functions'

export const generateEmail = async (data: { to: string; subject: string; body: string }) => {
  try {
    await emailjs.send('service_ml3efig', 'template_g2tlyfk', data, 'dl1eXeogprxy04wG4')
    return {
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error sending email')
  }
}

export const useEmailGeneration = () => {
  const dispatch = useAppDispatch()
  const handleEmailGeneration = useCallback(async (uid) => {
    try {
      const q = query(collection(db(), 'users'), where('uid', '==', uid))
      const docs = await getDocs(q)
      const userData = docs.docs[0].data()
      const result = await generateEmail({
        subject: 'Landlord wants to get connected to brands',
        body: `This is automatically generated e-mail from Spacewise Discovery App.
               Landlord ${userData.firstName} ${userData.lastName} ${userData.email} wants to get connected to the following brands:
               brand Id's`,
        to: 'sg@popupshops.com',
      })
      dispatch(
        openModal({
          open: true,
          title: 'Thanks!',
          subTitle: `Spacewise manager will contact you soon.`,
          children: null,
        }),
      )
      console.log(result)
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  return { handleEmailGeneration }
}
