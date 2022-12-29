import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ICategoryRequest } from '../interfaces/categories'

const categorySerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required(),
})

const categoryReturnSerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
})

const categoriesReturnSerializer: SchemaOf<ICategoryRequest[]> = yup.array().of(
  yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
}))



export { categorySerializer, categoryReturnSerializer, categoriesReturnSerializer}
