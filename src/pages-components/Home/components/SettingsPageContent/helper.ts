import * as yup from 'yup'

export type SettingsPageFormType = {
  distance: number
  filterByDistance: boolean
}

export const schema = yup.object({
  distance: yup.number().nullable(),
  filterByDistance: yup.bool().nullable(),
})
