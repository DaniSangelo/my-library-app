import { Book } from 'src/domain/entities/Book'
import { Book as PrismaBook } from '@prisma/client'

export class PrismaBookMapper {
  //   static toPrismaModel(book: Book): PrismaBook {

  //   }

  static toDomain(book: PrismaBook): Book {
    return Book.create({
      id: book.id,
      title: book.title,
      deviceId: book.deviceId,
      //   author: book.author ?? undefined,
      isbn: book.isbn ?? undefined,
      description: book.description ?? undefined,
      startedReadAt: book.startedReadAt ?? undefined,
      finishedReadAt: book.finishedReadAt ?? undefined,
    })
  }
}
