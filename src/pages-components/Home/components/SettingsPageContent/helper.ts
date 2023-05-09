import * as yup from 'yup'

export type SettingsPageFormType = {
  coordinates: Array<Record<string, string | number>>
  distance: number
  filterByDistance: boolean
  location: Record<string, any>
}

export const defaultValues = {
  coordinates: [],
  distance: null,
  filterByDistance: false,
  location: {},
}

export const schema = yup.object({
  coordinates: yup.array(),
  distance: yup.number(),
  filterByDistance: yup.bool(),
  location: yup.object(),
})
