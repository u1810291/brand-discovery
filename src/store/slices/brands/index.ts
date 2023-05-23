import { brandsSlice } from './brands.slice'
export { type BrandsType } from './brands.slice'

export const { setAllBrands } = brandsSlice.actions
export const brandsSelector = (state) => state.brands
export default brandsSlice.reducer
