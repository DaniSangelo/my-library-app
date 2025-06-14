import { Book, BookProps } from "src/domain/entities/Book";
import { IBookRepository } from "src/domain/repositories/i-book.repository";

interface CreateBookInput extends Omit<BookProps, 'id' | 'createdAt' | 'updatedAt'> {}

interface CreateBookOutput {
    book: Book
}

export class CreateBookUseCase {
    constructor(private readonly bookRepository: IBookRepository) {}

    async execute(request: CreateBookInput): Promise<CreateBookOutput> {
        const book = Book.create(request);
        await this.bookRepository.save(book);
        return { book };
    }
}