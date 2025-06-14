import { Router } from 'express'
import { ListBooksByDeviceUseCase } from '@src/application/use-cases/list-books-by-device'
import { PrismaBookRepository } from '@src/infrastructure/database/repositories/prisma-book.repository'
import { CreateBookUseCase } from '@src/application/use-cases/create-book'

const router = Router()
const bookRepository = new PrismaBookRepository()

router.get('/books/:id', async (req, res) => {
  const listBooksByDeviceUseCase = new ListBooksByDeviceUseCase(bookRepository)
  const books = await listBooksByDeviceUseCase.execute({ deviceId: 'e1' })
  res.json(books)
})

router.post('/books', async (req, res) => {
    const createBookUseCase = new CreateBookUseCase(bookRepository);
    const book = await createBookUseCase.execute({
        deviceId: req.body.deviceId,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        isbn: req.body.isbn,
    })
    res.json(book);
})

export default router
