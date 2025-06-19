import { Book } from 'src/domain/entities/Book'
import { IBookRepository } from 'src/domain/repositories/i-book.repository'
import axios from 'axios'

interface CreateBookByIsbnInput {
  isbn: string
  deviceId: string
}

export class CreateBookByIsbnUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(input: CreateBookByIsbnInput): Promise<void> {
    const { isbn, deviceId } = input

    if (!isbn || !deviceId) {
      throw new Error('ISBN and deviceId are required')
    }

    const bookData = await this.fetchBookFromOpenLibrary(isbn)
    const book = Book.create({
      title: bookData.title,
      author: bookData.authors?.map((a: { name: any }) => a.name).join(', '),
      isbn,
      deviceId,
    })

    await this.bookRepository.save(book)
  }

  private async fetchBookFromOpenLibrary(isbn: string): Promise<any> {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`

    const response = await axios.get(url)
    const data = response.data

    const bookKey = `ISBN:${isbn}`
    const book = data[bookKey]

    if (!book) {
      throw new Error('Book not found with the provided ISBN')
    }

    return book
  }
}
