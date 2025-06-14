import { faker } from '@faker-js/faker'
import { Book } from 'src/domain/entities/Book'

describe('Book entity', () => {
  it('should create a book with minimal data', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })
    expect(book.title).toBeTruthy()
    expect(book.title).toStrictEqual(expect.any(String))
  })

  it('should create a book with all data', () => {
    const book = Book.create({
      title: faker.book.title(),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      isbn: faker.number
        .int({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      deviceId: 'd1',
    })
    expect(book.title).toBeTruthy()
    expect(book.deviceId).toBeTruthy()
  })

  it('should update started read date', () => {
    const book = Book.create({
      title: faker.book.title(),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      isbn: faker.number
        .int({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      deviceId: 'd1',
    })

    expect(book.startedReadAt).toBeUndefined()

    const startedReadAt = faker.date.recent()
    book.startedReadAt = startedReadAt
    expect(book.startedReadAt).toStrictEqual(startedReadAt)
  })

  it('should update finished read date', () => {
    const book = Book.create({
      title: faker.book.title(),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      isbn: faker.number
        .int({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      deviceId: 'd1',
    })

    expect(book.finishedReadAt).toBeUndefined()

    const finishedReadAt = faker.date.recent()
    book.finishedReadAt = finishedReadAt
    expect(book.finishedReadAt).toStrictEqual(finishedReadAt)
  })

  it('should update updatedAt when title is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.title = faker.book.title()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })

  it('should update updatedAt when author is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.author = faker.person.fullName()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })

  it('should update updatedAt when isbn is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.isbn = faker.number
      .int({ min: 1000000000000, max: 9999999999999 })
      .toString()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })

  it('should update updatedAt when description is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.description = faker.lorem.paragraph()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })

  it('should update updatedAt when startedReadAt is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.startedReadAt = faker.date.recent()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })

  it('should update updatedAt when finishedReadAt is changed', () => {
    const book = Book.create({
      title: faker.book.title(),
      deviceId: 'd1',
    })

    const currentDate = new Date()
    book.finishedReadAt = faker.date.recent()
    expect(book.updatedAt.getTime()).toBeCloseTo(currentDate.getTime(), -3)
  })
})
