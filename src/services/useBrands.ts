import { useState, useEffect } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { useAppDispatch } from 'src/store'
import { BrandsType, setAllBrands } from 'src/store/slices/brands'

export const useBrands = () => {
  const [brands, setBrands] = useState<Array<BrandsType>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true)
      try {
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
        setBrands(brand)
        dispatch(setAllBrands(brand))
      } catch (error) {
        setError(error?.message)
      }
      setLoading(false)
    }

    fetchBrands()
  }, [])

  async function getCityDetails(lat: number, lon: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/reverse?format=json&addressdetails=1&format=json&limit=5&lat=${lat}&lon=${lon}`,
    )
    const data = res.json()
    return data
  }

  return { brands, loading, error }
}
