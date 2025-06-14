import { randomUUID } from 'node:crypto'

// todo: improve entity
export interface PublisherProps {
  id?: string
  name: string
}

export class Publisher {
  private constructor(private props: PublisherProps) {
    this.validate(props)
    this.props = props
  }

  static create(props: PublisherProps) {
    return new Publisher(props)
  }

  private validate(props: PublisherProps) {
    if (!props.name) {
      throw new Error('Name is required')
    }
    props.id = props.id ?? randomUUID()
  }

  get id() {
    return this.props.id!
  }

  get name() {
    return this.props.name
  }
}
