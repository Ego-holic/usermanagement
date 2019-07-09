export interface ApplicationViewI {
  name: string;
  clientSecret: string;
  description: string;
}
export interface ApplicationI extends ApplicationViewI {
  id: string;
  isSystem: boolean;
  roles: string[];
}

export interface RoleViewI {
  name: string;
  displayName: string;
  description: string;
}
export interface RoleI extends RoleViewI {
  applicationId: string;
  isSystem: boolean;
  id: string;
  normalizedName: string;
  concurrencyStamp: string;
}
