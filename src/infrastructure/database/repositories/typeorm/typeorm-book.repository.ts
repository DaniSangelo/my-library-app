import { Book } from '@src/domain/entities/Book';
import { IBookRepository } from '@src/domain/repositories/i-book.repository';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../typeorm.config';
import { BookEntity } from '../../entities/book-entity';
import { BookMapper } from '../../mappers/book-mapper';

export class TypeOrmBookRepository implements IBookRepository {
  private repository: Repository<BookEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(BookEntity);
  }

  async save(book: Book): Promise<void> {
    const bookEntity = BookMapper.toTypeORM(book)
    await this.repository.save(bookEntity)
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.repository.findOneBy({ id: id as any });
    if (!book) return null;
    return BookMapper.toDomain(book);
  }

  async findAllByDeviceId(deviceId: string): Promise<Book[]> {
    const books = await this.repository.find({ where: { deviceId } });
    if (!books) return [];
    return BookMapper.toDomainList(books);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}