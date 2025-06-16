import { Book } from 'src/domain/entities/Book'
import { Prisma, Book as PrismaBook } from '@prisma/client'

export class PrismaBookMapper {
    static toPrismaModel(book: Book): Prisma.BookUncheckedCreateInput {
      return {
        id: book.id,
        title: book.title,
        author: book.author ?? null,
        isbn: book.isbn ?? null,
        description: book.description ?? null,
        deviceId: book.deviceId,
        startedReadAt: book.startedReadAt ?? null,
        finishedReadAt: book.finishedReadAt ?? null,
      };
    }

  static toDomain(book: PrismaBook): Book {
    return Book.create({
      id: book.id,
      title: book.title,
      deviceId: book.deviceId,
      author: book.author ?? undefined,
      isbn: book.isbn ?? undefined,
      description: book.description ?? undefined,
      startedReadAt: book.startedReadAt ?? undefined,
      finishedReadAt: book.finishedReadAt ?? undefined,
    })
  }
}
