import { DataSource } from 'typeorm';
import 'dotenv/config';
import { BookEntity } from './entities/book-entity';

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    // useUnifiedTopology: true,
    database: 'my-library-db',
    synchronize: true,
    logging: false,
    entities: [BookEntity],
  });