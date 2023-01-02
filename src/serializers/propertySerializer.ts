import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IPropertyRequest } from '../interfaces/properties'
import { addressReturnSerializer } from './addressSerializer'
import { categoryReturnSerializer } from './categorySerializer'

export const propSerializer: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: addressReturnSerializer,
  categoryId: yup.string().notRequired(),
})

// export const propReturnSerializer: SchemaOf<IPropertyRequest> = yup
//   .object()
//   .shape({
//     id: yup.string().notRequired(),
//     sold: yup.boolean().notRequired(),
//     value: yup.number().notRequired(),
//     size: yup.number().notRequired(),
//     createdAt: yup.date().notRequired(),
//     updatedAt: yup.date().notRequired(),
//     categoryId: yup.string().notRequired(),
//     addressesId: addressReturnSerializer,
//   })

// export const propsReturnSerializer: SchemaOf<IPropertyRequest[]> = yup
//   .array()
//   .of(
//     yup.object().shape({
//       id: yup.string().notRequired(),
//       sold: yup.boolean().notRequired(),
//       value: yup.number().notRequired(),
//       size: yup.number().notRequired(),
//       createdAt: yup.date().notRequired(),
//       updatedAt: yup.date().notRequired(),
//       categoryId: yup.string().notRequired(),
//       addressesId: addressReturnSerializer,
//     })
//   )
