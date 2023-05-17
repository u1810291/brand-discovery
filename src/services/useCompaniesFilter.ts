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

export const UseCompaniesFilter = () => {
  const getUserCategories = useCallback(async (user: UserData): Promise<Array<string>> => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as SettingsType

      return userData.categories
    } catch (err) {
      throw Error(err)
    }
  }, [])

  const getCompanyCategory = useCallback(async (orgId: string): Promise<Array<string>> => {
    try {
      const q = query(collection(db(), 'companies'), where('_id', '==', orgId))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No company found with id: ${orgId}`)
      }
      const companyData = docs.docs[0].data() as CompaniesType

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
