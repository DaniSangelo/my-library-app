import { randomUUID } from 'node:crypto'

export interface AuthorProps {
    id?: string;
    name: string;
}

export class Author {
    private props: AuthorProps;

    private constructor(props: AuthorProps) {
        this.validate(props);
        this.props = props;
    }

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    static create(props: AuthorProps) {
        return new Author(props);
    }

    private validate(props: AuthorProps) {
        if (!props.name) {
            throw new Error("Author name is required");
        }
        props.id = props.id ?? randomUUID();
    }
}