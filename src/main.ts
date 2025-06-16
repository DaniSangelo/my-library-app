import 'reflect-metadata'
import { AppDataSource } from './infrastructure/database/typeorm.config'
import app from './interfaces/http/server'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established')
    console.log(
      'Entidades carregadas:',
      AppDataSource.entityMetadatas.map((e) => e.name),
    )
  } catch (error) {
    console.error('Error during Data Source initialization:', error)
  }
}

bootstrap()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
