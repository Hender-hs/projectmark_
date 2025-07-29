export class Topic {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly content: string,
    public readonly version: string,
    public readonly parentTopicId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}