import { randomBytes } from 'crypto';

export default class BaseBuilder {
    
    constructor() {
        // Initialize with default values if needed
    }

    protected generateId(): string {
        return randomBytes(12).toString('hex');
    }
}