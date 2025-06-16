import { Entity, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class BookEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ type: 'string' })
  title!: string;

  @Column({ type: 'string', nullable: true })
  author?: string;

  @Column({ type: 'string', nullable: true })
  isbn?: string;

  @Column({ type: 'string', nullable: true })
  description?: string;

  @Column({ type: 'string' })
  deviceId!: string;

  @Column({ type: 'date', nullable: true })
  createdAt?: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'date', nullable: true })
  startedReadAt?: Date;

  @Column({ type: 'date', nullable: true })
  finishedReadAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamps() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
