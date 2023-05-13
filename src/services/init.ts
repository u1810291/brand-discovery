import { doc, setDoc, getDoc, getDocs, query, collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import categories from '../../categories.json'
import companies from '../../companies.json'

export const useSetCategory = () => {
  const setCategory = async () => {
    try {
      const categoriesRef = doc(db(), 'categories', 'main_category')
      const categoriesSnap = await getDoc(categoriesRef)
      const companiesRef = query(collection(db(), 'companies'))
      const companiesSnap = await getDocs(companiesRef)
      if (!categoriesSnap.exists()) {
        await setDoc(doc(db(), 'categories', 'main_category'), {
          categories: categories.main_category,
        })
      }
      if (!companiesSnap.docs.length) {
        companies.map(async (el) => {
          await addDoc(collection(db(), 'companies'), el)
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return [setCategory] as const
}
