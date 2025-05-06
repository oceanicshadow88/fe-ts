import { IStatusBacklog } from "../../src/types";

export default class StatusBuilder {
    private readonly data: IStatusBacklog;

    constructor() {
        this.data = {
            id: 'default-status-id',
            slug: 'default-status',
            name: 'Default Status',
            order: 0,
        };
    }
    
    withId(id: string): this {
        this.data.id = id;
        return this;
    }

    withName(name: string): this {
        this.data.name = name;
        return this;
    }

    withSlug(slug: string): this {
        this.data.slug = slug;
        return this;
    }

    withOrder(order: number): this {
        this.data.order = order;
        return this;
    }

    withBoard(board: string): this {
        this.data.board = board;
        return this;
    }

    build(): IStatusBacklog {
        return {
            ...this.data,
        };
    }
}
