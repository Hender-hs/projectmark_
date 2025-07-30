import { Resource } from "../../../../../domain/resource/model/resource.model";
import { Topic } from "../../../../../domain/topic/model/topic.model";
import { User } from "../../../../../domain/user/model/user.model";

export class JsonDatabaseSchema {
  constructor(
    public readonly users: User[],
    public readonly topics: Topic[],
    public readonly resources: Resource[],
  ) {}
}
