import { IStatusBacklog } from "../../src/types";

export class StatusBuilder {
    private readonly data: IStatusBacklog;

    constructor() {
        this.data = {
            id: '',
            slug: 'default-status',
            name: 'Default Status',
            order: 0,
            board: 'default-board',
            tenant: 'default-tenant',
            isDefault: false,
            updatedAt: new Date(),
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

    withTenant(tenant: string): this {
        this.data.tenant = tenant;
        return this;
    }

    withIsDefault(isDefault: boolean): this {
        this.data.isDefault = isDefault;
        return this;
    }

    withUpdatedAt(updatedAt: Date): this {
        this.data.updatedAt = updatedAt;
        return this;
    }

    build(): IStatusBacklog {
        return {
            ...this.data,
        };
    }
}
