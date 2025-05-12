import BaseBuilder from './BaseBuilder';

export class EpicBuilder extends BaseBuilder {
    private readonly data: any;

    constructor() {
        super();
        this.data = {
            id: this.id,
            title: 'Default Epic',
            project: this.generateId(),
            tenant: this.generateId(),
        }
    }

    withId(id: string): this {
        this.data.id = id;
        return this;
    }

    withTitle(title: string): this {
        this.data.title = title;
        return this;
    }

    withProject(project: string): this {
        this.data.project = project;
        return this;
    }

    withTenant(tenant: string): this {
        this.data.tenant = tenant;
        return this;
    }

    withColor(color: string): this {
        this.data.color = color;
        return this;
    }

    withDescription(description: string): this {
        this.data.description = description;
        return this;
    }

    withStartDate(startDate: string): this {
        this.data.startDate = startDate;
        return this;
    }

    withDueAt(dueAt: string): this {
        this.data.dueAt = dueAt;
        return this;
    }

    withReport(report: string): this {
        this.data.report = report;
        return this;
    }

    withAssign(assign: string): this {
        this.data.assign = assign;
        return this;
    }

    withIsComplete(isComplete: boolean): this {
        this.data.isComplete = isComplete;
        return this;
    }

    withIsActive(isActive: boolean): this {
        this.data.isActive = isActive;
        return this;
    }

    withGoal(goal: string): this {
        this.data.goal = goal;
        return this;
    }

    withCurrentEpic(currentEpic: boolean): this {
        this.data.currentEpic = currentEpic;
        return this;
    }

    withAttachmentUrls(attachmentUrls: string[]): this {
        this.data.attachmentUrls = attachmentUrls;
        return this;
    }

    withCreatedAt(createdAt: string): this {
        this.data.createdAt = createdAt;
        return this;
    }

    withUpdatedAt(updatedAt: string): this {
        this.data.updatedAt = updatedAt;
        return this;
    }

    // Example method
    build() {
        return {
            ...this.data,
        };
    }
}

export default EpicBuilder;