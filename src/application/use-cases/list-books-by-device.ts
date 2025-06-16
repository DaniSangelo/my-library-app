import { Book } from '../../domain/entities/Book'
import { IBookRepository } from '../../domain/repositories/i-book.repository'
import { BookPresenter, BookPresenterImpl } from '../../interfaces/presenters/book-presenter'

interface ListBooksByDeviceInput {
  deviceId: string
}

interface ListBooksByDeviceOutput {
  books: BookPresenter[]
}

export class ListBooksByDeviceUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(request: ListBooksByDeviceInput): Promise<ListBooksByDeviceOutput> {
    const books = await this.bookRepository.findAllByDeviceId(request.deviceId)
    return {
      books: BookPresenterImpl.toJSONList(books)
    }
  }
}
