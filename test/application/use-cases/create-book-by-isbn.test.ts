import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { InMemoryBookRepository } from 'test/domain/repositories/in-memory-book.repository';
import { CreateBookByIsbnUseCase } from 'src/application/use-cases/create-book-by-isbn';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe('Create book by Isbn use case', () => {
  let sut: CreateBookByIsbnUseCase;
  let inMemoryBookRepository: InMemoryBookRepository;

  beforeEach(() => {
    inMemoryBookRepository = new InMemoryBookRepository();
    sut = new CreateBookByIsbnUseCase(inMemoryBookRepository);
  });

  it('should create a book with data from OpenLibrary using ISBN', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: {
      'ISBN:9789897775482': {
        title: 'The lord of the rings',
        authors: [{ name: 'J.R.R. Tolkien' }],
      },
    },
    });

    await sut.execute({
      isbn: '9789897775482',
      deviceId: 'device-123',
    });

    expect(inMemoryBookRepository.items).toHaveLength(1);
    expect(inMemoryBookRepository.items[0].title).toBe('The lord of the rings');
  });

  it('should throw if ISBN is missing', async () => {
    await expect(() =>
      sut.execute({
        isbn: '',
        deviceId: 'device-123',
      })
    ).rejects.toThrowError('ISBN and deviceId are required');
  });

  it('should throw if OpenLibrary returns error', async () => {
    mockedAxios.get = vi.fn().mockRejectedValue(new Error('Not found'));

    await expect(() =>
      sut.execute({
        isbn: 'invalid-isbn',
        deviceId: 'device-123',
      })
    ).rejects.toThrowError('Not found');
  });
});
