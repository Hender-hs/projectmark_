import { Topic } from "./topic.model";

export interface TopicComponent {
  topic: Topic;

  add?(component: TopicComponent): void;
  remove?(id: string): void;
  getChild?(id: string): TopicComponent | undefined;
  getChildren?(): TopicComponent[];
}

export class TopicComposite implements TopicComponent {
  private children: TopicComponent[] = [];

  constructor(public readonly topic: Topic) {}

  add(component: TopicComponent) {
    this.children.push(component);
  }

  remove(id: string) {
    this.children = this.children.filter((child) => child.topic.id !== id);
  }

  getChild(id: string) {
    return this.children.find((child) => child.topic.id === id);
  }

  getChildren() {
    return this.children;
  }
}