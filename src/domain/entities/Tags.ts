//todo: improve entity
export interface TagProps {
    id: string;
    name: string;
}
  
export class Tag {
    constructor(private props: TagProps) {}

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }
}
  