import { faker } from '@faker-js/faker'
import { CreateBookUseCase } from 'src/application/use-cases/create-book'
import { Book } from 'src/domain/entities/Book'
import { InMemoryBookRepository } from 'test/domain/repositories/in-memory-book.repository'

let inMemoryBookRepository: InMemoryBookRepository
let sut: CreateBookUseCase

describe('Create book use case', () => {
  beforeEach(() => {
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new CreateBookUseCase(inMemoryBookRepository)
  })

  it('should create a book with a valid data', async () => {
    const book = {
      title: faker.book.title(),
      author: faker.person.fullName(),
      isbn: faker.commerce.isbn(),
      description: faker.lorem.paragraph(),
      deviceId: 'd1',
      startedReadAt: faker.date.past(),
      finishedReadAt: faker.date.future(),
    }
    const result = await sut.execute(book)
    expect(result.book).toBeInstanceOf(Book)
    expect(result.book.title).toEqual(book.title)
  })

  it('should not create a book without deviceId', async () => {
    await expect(() => {
      return sut.execute({
        title: faker.book.title(),
        deviceId: '',
      })
    }).rejects.toThrowError()
  })
})
