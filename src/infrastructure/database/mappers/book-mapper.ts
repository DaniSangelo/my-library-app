import { Book } from '../../../domain/entities/Book'
import { ObjectId } from 'mongodb'
import { BookEntity } from '../entities/book-entity'

export class BookMapper {
  static toDomain(entity: BookEntity): Book {
    return Book.create({
      id: entity.id.toString(),
      title: entity.title,
      author: entity.author,
      isbn: entity.isbn,
      description: entity.description,
      deviceId: entity.deviceId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      startedReadAt: entity.startedReadAt,
      finishedReadAt: entity.finishedReadAt,
    })
  }

  static toTypeORM(book: Book): BookEntity {
    const entity = new BookEntity()

    if (book.id) {
      entity.id = new ObjectId(book.id)
    }

    entity.title = book.title
    entity.author = book.author
    entity.isbn = book.isbn
    entity.description = book.description
    entity.deviceId = book.deviceId
    entity.startedReadAt = book.startedReadAt
    entity.finishedReadAt = book.finishedReadAt

    return entity
  }

  static toTypeORMList(books: Book[]): BookEntity[] {
    return books.map((book) => this.toTypeORM(book))
  }

  static toDomainList(entities: BookEntity[]): Book[] {
    return entities.map((entity) => this.toDomain(entity))
  }
}
