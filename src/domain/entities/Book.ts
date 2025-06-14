import { randomUUID } from 'node:crypto'

export interface BookProps {
  id?: string
  title: string
  author?: string
  isbn?: string
  description?: string
  // coverImageUrl?: string;
  deviceId: string
  createdAt?: Date
  updatedAt?: Date
  startedReadAt?: Date
  finishedReadAt?: Date
}

export class Book {
  private props: BookProps

  private constructor(props: BookProps) {
    this.validate(props)
    this.props = {
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  static create(props: BookProps) {
    return new Book(props)
  }

  private validate(props: BookProps) {
    if (!props.title) throw new Error('Book title is required')
    if (!props.deviceId) throw new Error('deviceId is required')

    props.id = props.id ?? randomUUID()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  // #region getters
  get id(): string {
    return this.props.id!
  }

  get title(): string {
    return this.props.title
  }

  get author(): string | undefined {
    return this.props.author
  }

  get isbn(): string | undefined {
    return this.props.isbn
  }

  get description(): string | undefined {
    return this.props.description
  }

  get startedReadAt(): Date | undefined {
    return this.props.startedReadAt
  }

  get finishedReadAt(): Date | undefined {
    return this.props.finishedReadAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt!
  }

  get deviceId(): string {
    return this.props.deviceId
  }

  // #endregion

  // #region setters
  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  set author(author: string) {
    this.props.author = author
    this.touch()
  }

  set isbn(isbn: string) {
    this.props.isbn = isbn
    this.touch()
  }

  set description(description: string | undefined) {
    this.props.description = description
    this.touch()
  }

  set startedReadAt(date: Date) {
    this.props.startedReadAt = date
    this.touch()
  }

  set finishedReadAt(date: Date) {
    this.props.finishedReadAt = date
    this.touch()
  }

  // #endregion
}
