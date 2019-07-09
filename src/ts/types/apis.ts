import { ApplicationI, RoleI } from '@/ts/types/models';

export interface GetApplicationsResI extends Array<ApplicationI> {}
export interface GetApplicationResI extends ApplicationI {}
export interface PutApplicationReqI extends ApplicationI {}
export interface PutApplicationResI extends ApplicationI {}
export interface PostApplicationReqI extends ApplicationI {}
export interface PostApplicationResI extends ApplicationI {}

export interface GetRolesResI extends Array<RoleI> {}
export interface GetRoleResI extends RoleI {}
export interface PutRoleReqI extends RoleI {}
export interface PutRoleResI extends RoleI {}
export interface PostRoleReqI extends RoleI {}
export interface PostRoleResI extends RoleI {}
