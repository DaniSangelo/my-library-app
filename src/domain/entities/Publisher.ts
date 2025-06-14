//todo: improve entity
export interface PublisherProps {
    id: string;
    name: string;
}
  
export class Publisher {
    constructor(private props: PublisherProps) {}

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }
}
  