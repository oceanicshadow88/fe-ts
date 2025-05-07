export default class BaseBuilder {
    constructor() {
        // Initialize with default values if needed
    }

    protected generateId(): string {
        return Array.from({ length: 24 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }
}