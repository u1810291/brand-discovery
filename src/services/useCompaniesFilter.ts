import { useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { query, where } from 'firebase/firestore'
import { db } from './firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { SettingsType } from 'src/store/slices/settings'
import { CompaniesType } from './useGeolocationFilter'

interface CheckCompanyPayload {
  userCategories: Array<string>
  companyCategories: Array<string>
}

export const useCompaniesFilter = () => {
  const getUserCategories = useCallback(async (user: UserData): Promise<SettingsType> => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as SettingsType

      return userData
    } catch (err) {
      throw Error(err)
    }
  }, [])

  const getCompanyCategory = useCallback(async (settings: SettingsType): Promise<Array<string>> => {
    try {
      const q = query(collection(db(), 'brands'), where('main_categories', 'in', settings.categories))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No company found with id: ${orgId}`)
      }
      const companyData = docs.docs[0].data() as CompaniesType

      const q = await query(collection(db(), 'brands'), limit(25))
      const data = await getDocs(q)
      const brand = []
      data.forEach(async (doc) => {
        try {
          brand.push({
            company: {
              title: doc.data()?.profile_name,
              location: 'San Francisco',
              image: doc.data()?.profile_image_url,
              followers: doc.data()?.combined_followers,
              tags: [...doc.data().categories?.split('/').filter(Boolean), doc.data()?.main_categories],
              id: doc.data()._id,
            },
            images: [
              doc.data().picture_1,
              doc.data().picture_2,
              doc.data().picture_3,
              doc.data().picture_4,
              doc.data().picture_5,
            ],
          })
        } catch (err) {
          console.error(err)
        }
      })
      return companyData.main_categories
        .replace(/[&|,]/g, ' ')
        .split(' ')
        .filter((name) => name.length > 0)
    } catch (err) {
      throw Error(err)
    }
  }, [])

  const companySuitsCategory = useCallback((payload: CheckCompanyPayload): boolean => {
    const { userCategories, companyCategories } = payload

    return companyCategories.some((category) => userCategories.includes(category))
  }, [])

  return { getUserCategories, getCompanyCategory, companySuitsCategory }
}
