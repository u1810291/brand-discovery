import { doc, setDoc, getDoc, getDocs, query, collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import categories from '../../categories.json'
import companies from '../../data.json'

export const useSetCategory = () => {
  const setCategory = async () => {
    try {
      const categoriesRef = doc(db(), 'categories', 'main_category')
      const categoriesSnap = await getDoc(categoriesRef)
      const companiesRef = query(collection(db(), 'brands'))
      const companiesSnap = await getDocs(companiesRef)
      if (!categoriesSnap.exists()) {
        await setDoc(doc(db(), 'categories', 'main_category'), {
          categories: categories.main_category,
        })
      }

      if (!companiesSnap.docs.length) {
        companies?.map(async (el) => {
          await addDoc(collection(db(), 'brands'), el)
        })
      }
      // else {
      //   const companies = []
      //   companiesSnap.forEach((el) => companies.push(el.data()))
      //   fs.readFile('./companies.json', 'utf8', (err: any, data: any) => {
      //     if (err) {
      //       console.error(err)
      //     } else {
      //       console.error('data', data)
      //     }
      //   })
      // }
    } catch (err) {
      console.error(err)
    }
  }

  return [setCategory] as const
}
