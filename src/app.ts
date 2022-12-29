import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import userRoutes from './routes/userRouter'
import sessionRoutes from './routes/sessionRoutes'
import handleError from './errors/handleError'
import categoriesRoutes from './routes/categoriesRoutes'
import propertiesRoutes from './routes/propertiesRoutes'
import schedulesRoutes from './routes/schedulesRoutes'

const app = express()

app.use(express.json())
app.use('/users', userRoutes)
app.use('/login', sessionRoutes)
app.use('/categories', categoriesRoutes)
app.use('/properties', propertiesRoutes)
app.use('/schedules', schedulesRoutes)
app.use(handleError)

export default app
