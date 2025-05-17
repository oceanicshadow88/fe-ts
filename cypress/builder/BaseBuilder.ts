export default class BaseBuilder {
    protected id: string;

    constructor() {
        // Initialize with default values if needed
        this.id = this.generateId();
    }

    protected generateId(): string {
        return Array.from({ length: 24 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }
}