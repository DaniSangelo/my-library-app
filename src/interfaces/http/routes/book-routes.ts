import { Router } from 'express'
import { ListBooksByDeviceUseCase } from '@src/application/use-cases/list-books-by-device'
import { PrismaBookRepository } from '@src/infrastructure/database/repositories/prisma-book.repository'

const router = Router()
const bookRepository = new PrismaBookRepository()

router.get('/books/:id', async (req, res) => {
  const listBooksByDeviceUseCase = new ListBooksByDeviceUseCase(bookRepository)
  const books = await listBooksByDeviceUseCase.execute({ deviceId: 'e1' })
  res.json(books)
})

export default router
