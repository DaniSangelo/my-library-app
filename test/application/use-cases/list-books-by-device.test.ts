import { faker } from "@faker-js/faker";
import { ListBooksByDeviceUseCase } from "src/application/use-cases/list-books-by-device";
import { Book } from "src/domain/entities/Book";
import { InMemoryBookRepository } from "test/domain/repositories/in-memory-book.repository";

let inMemoryBooksRepository: InMemoryBookRepository
let sut: ListBooksByDeviceUseCase

describe("List books by device use case", () => {
    beforeEach(() => {
        inMemoryBooksRepository = new InMemoryBookRepository()
        sut = new ListBooksByDeviceUseCase(inMemoryBooksRepository)
    })

    it('should return an empty array when no books exist for device', async () => {
        const result = await sut.execute({ deviceId: 'device-123' });
        expect(result.books).toHaveLength(0);
    });

    it('should return all books for a given deviceId', async () => {
        await inMemoryBooksRepository.save(Book.create({ title: faker.book.title(), deviceId: 'device-123' }));
        await inMemoryBooksRepository.save(Book.create({ title: faker.book.title(), deviceId: 'device-123' }));
        await inMemoryBooksRepository.save(Book.create({ title: faker.book.title(), deviceId: 'device-456' }));
    
        const result = await sut.execute({ deviceId: 'device-123' });
    
        expect(result.books).toHaveLength(2);
        expect(result.books.every(b => b.deviceId === 'device-123')).toBe(true);
      });
})