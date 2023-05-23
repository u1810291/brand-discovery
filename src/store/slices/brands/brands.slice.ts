import { createSlice } from '@reduxjs/toolkit'

export type BrandsType = {
  profile_name?: string
  picture_2?: string
  picture_3?: string
  categories?: string
  picture_5?: string
  loc_latitude?: number
  _id?: string
  loc_longitude?: number
  linkedin_url?: string
  picture_4?: string
  facebook_url?: string
  instagram_followers?: string
  instagram_url?: string
  picture_1?: string
  combined_followers?: string
  main_categories?: string
}

const initialState = {
  brands: [],
}
// create a slice
export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setAllBrands: (state, { payload }: { payload: BrandsType[] }) => {
      state.brands = [...payload]
    },
  },
})
