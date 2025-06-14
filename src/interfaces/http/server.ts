import bookRoutes from './routes/book-routes'
import express from 'express'

const app = express()
app.use(express.json())
app.use('/api', bookRoutes)

export default app
