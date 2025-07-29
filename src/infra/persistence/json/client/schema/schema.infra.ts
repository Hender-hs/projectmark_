import { ResourceModel } from "../../../../../domain/resource/model/resource.model";
import { TopicModel } from "../../../../../domain/topic/model/topic.model";
import { UserModel } from "../../../../../domain/user/model/user.model";

export class JsonDatabaseSchema {
  constructor(
    public readonly users: UserModel[],
    public readonly topics: TopicModel[],
    public readonly resources: ResourceModel[],
  ) {}
}