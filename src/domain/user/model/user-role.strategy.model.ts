import { UserRole } from "./user.model";

export interface RoleStrategy {
  canView(): boolean;
  canEdit(): boolean;
  canCreate(): boolean;
  canDelete(): boolean;
  getRole(): UserRole;
}

export class AdminRoleStrategy implements RoleStrategy {
  canView(): boolean {
    return true;
  }

  canEdit(): boolean {
    return true;
  }

  canCreate(): boolean {
    return true;
  }

  canDelete(): boolean {   
    return true;
  }

  getRole(): UserRole {
    return UserRole.ADMIN;
  }
}

export class EditorRoleStrategy implements RoleStrategy {
  canView(): boolean {
    return true;
  }

  canEdit(): boolean {
    return true;
  }

  canCreate(): boolean {
    return true;
  }

  canDelete(): boolean {
    return false;
  }

  getRole(): UserRole {
    return UserRole.EDITOR;
  }
}

export class ViewerRoleStrategy implements RoleStrategy {
  canView(): boolean {
    return true;
  }

  canEdit(): boolean {
    return false;
  }

  canCreate(): boolean {
    return false;
  }

  canDelete(): boolean {
    return false;
  }

  getRole(): UserRole {
    return UserRole.VIEWER;
  }
}