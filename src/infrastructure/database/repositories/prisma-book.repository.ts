import { IBookRepository } from 'src/domain/repositories/i-book.repository'
import { Book } from 'src/domain/entities/Book'
import { PrismaBookMapper } from '../mappers/prisma-book-mapper'
import { prisma } from '../Prisma'

export class PrismaBookRepository implements IBookRepository {

  async save(book: Book): Promise<void> {
    await prisma.book.upsert({
      where: {
        id: book.id,
      },
      update: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        description: book.description,
        startedReadAt: book.startedReadAt,
        finishedReadAt: book.finishedReadAt,
      },
      create: {
        id: book.id,
        title: book.title,
        deviceId: book.deviceId,
        author: book.author,
        isbn: book.isbn,
        description: book.description,
        startedReadAt: book.startedReadAt,
        finishedReadAt: book.finishedReadAt,
      },
    })
  }

  async findById(id: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({ where: { id } })
    if (!book) return null
    return PrismaBookMapper.toDomain(book)
  }

  async findAllByDeviceId(deviceId: string): Promise<Book[]> {
    const books = await prisma.book.findMany({ where: { deviceId } })
    return books.map((book) => PrismaBookMapper.toDomain(book))
  }

  async delete(id: string): Promise<void> {
    await prisma.book.delete({ where: { id } })
  }
}
