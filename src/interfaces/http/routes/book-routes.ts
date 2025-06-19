import { Router } from 'express'
import { ListBooksByDeviceUseCase } from '@src/application/use-cases/list-books-by-device'
import { CreateBookUseCase } from '@src/application/use-cases/create-book'
import { TypeOrmBookRepository } from '@src/infrastructure/database/repositories/typeorm/typeorm-book.repository'
import { CreateBookByIsbnUseCase } from '@src/application/use-cases/create-book-by-isbn'

const router = Router()
const bookRepository = new TypeOrmBookRepository()

router.get('/books/:id', async (req, res) => {
  const listBooksByDeviceUseCase = new ListBooksByDeviceUseCase(bookRepository)
  const deviceId = req.params.id
  const books = await listBooksByDeviceUseCase.execute({ deviceId })
  res.json(books)
})

router.post('/books', async (req, res) => {
  const createBookUseCase = new CreateBookUseCase(bookRepository)
  const book = await createBookUseCase.execute({
    deviceId: req.body.deviceId,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn,
  })
  res.json(book)
})

router.post('/books/isbn', async (req, res) => {
  const { isbn, deviceId } = req.body
  const createBookByIsbnUseCase = new CreateBookByIsbnUseCase(bookRepository);
  await createBookByIsbnUseCase.execute({isbn, deviceId});
  res.status(201).send();
})

export default router
