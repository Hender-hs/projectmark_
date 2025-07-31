import { AdminRoleStrategy, EditorRoleStrategy, RoleStrategy, ViewerRoleStrategy } from "./user-role.strategy.model";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public getUserPermission(): RoleStrategy {
    switch (this.role) {
      case UserRole.ADMIN:
        return new AdminRoleStrategy();
      case UserRole.EDITOR:
        return new EditorRoleStrategy();
      case UserRole.VIEWER:
        return new ViewerRoleStrategy();
    }
  }
}
