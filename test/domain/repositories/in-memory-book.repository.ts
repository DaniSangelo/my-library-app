import { Book } from "src/domain/entities/Book";
import { IBookRepository } from "src/domain/repositories/i-book.repository";

export class InMemoryBookRepository implements IBookRepository {
    public items: Book[] = [];

    async save(book: Book): Promise<void> {
        this.items.push(book);
    }

    async findById(id: string): Promise<Book | null> {
        return this.items.find(b => b.id === id) ?? null;
    }

    async findAllByDeviceId(deviceId: string): Promise<Book[]> {
        return this.items.filter(b => b.deviceId === deviceId);
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(b => b.id !== id);
    }
} 