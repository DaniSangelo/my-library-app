import { Book } from '../entities/Book'

export interface IBookRepository {
  save(book: Book): Promise<void>
  findById(id: string): Promise<Book | null>
  findAllByDeviceId(deviceId: string): Promise<Book[]>
  delete(id: string): Promise<void>
}
