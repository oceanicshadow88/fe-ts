import { IStatus } from "../../src/types";
import BaseBuilder from "./BaseBuilder";

export default class StatusBuilder extends BaseBuilder {
    private readonly data: IStatus;

    constructor() {
        super();
        this.data = {
            id: this.generateId(),
            slug: 'default-status',
            name: 'Default Status',
            board: 'default-board',
            tenant: this.generateId(),
            isDefault: false,
            updatedAt: new Date().toString(),
            createdAt: new Date().toString(),
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

    withUpdatedAt(updatedAt: string): this {
        this.data.updatedAt = updatedAt;
        return this;
    }

    withCreatedAt(createdAt: string): this {
        this.data.createdAt = createdAt;
        return this;
    }

    build(): IStatus {
        return {
            ...this.data,
        };
    }
}
