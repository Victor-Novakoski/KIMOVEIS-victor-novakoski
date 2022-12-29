import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IAddressRequest } from '../interfaces/properties'

export const addressSerializer: SchemaOf<IAddressRequest> = yup.object().shape({
  district: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup.string().notRequired(),
})

export const addressReturnSerializer: SchemaOf<IAddressRequest> = yup.object().shape({
  id: yup.string().notRequired(),
  district: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup.string().notRequired(),
})

export const addressesReturnSerializer: SchemaOf<IAddressRequest[]> = yup.array().of(
  yup.object().shape({
    id: yup.string().notRequired(),
    district: yup.string().required(),
    zipCode: yup.string().required(),
    number: yup.string().required(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
}))




