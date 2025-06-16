import { Book } from '../../domain/entities/Book';

export interface BookPresenter {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  description?: string;
  deviceId: string;
  startedReadAt?: Date;
  finishedReadAt?: Date;
}

export class BookPresenterImpl {
  static toJSON(book: Book): BookPresenter {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      deviceId: book.deviceId,
      startedReadAt: book.startedReadAt,
      finishedReadAt: book.finishedReadAt,
    };
  }

  static toJSONList(books: Book[]): BookPresenter[] {
    return books.map(book => this.toJSON(book));
  }
} 