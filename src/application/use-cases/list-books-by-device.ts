import { Book } from "src/domain/entities/Book";
import { IBookRepository } from "src/domain/repositories/i-book.repository";

interface ListBooksByDeviceInput {
    deviceId: string;
}

interface ListBooksByDeviceOutput {
    books: Book[];
}

export class ListBooksByDeviceUseCase {
    constructor(private readonly booksRepository: IBookRepository){}

    async execute({deviceId}: ListBooksByDeviceInput): Promise<ListBooksByDeviceOutput> {
        const books = await this.booksRepository.findAllByDeviceId(deviceId)
        return { books: books }
    }
}