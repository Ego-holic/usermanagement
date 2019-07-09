import { get, post, put, del } from '@/ts/apiMethods';
import { GetRolesResI, GetRoleResI, PutRoleReqI, PutRoleResI, PostRoleReqI, PostRoleResI } from '@/ts/types/apis';
const apis = {
  getRoles(applicationId: string) {
    return get<any, GetRolesResI>('/roles', { applicationId });
  },
  getRole(id: string) {
    return get<null, GetRoleResI>(`/roles/${id}`);
  },
  postRole(req: PostRoleReqI) {
    return post<PostRoleReqI, PostRoleResI>('/roles', req);
  },
  putRole(req: PutRoleReqI) {
    return put<PutRoleReqI, PutRoleResI>(`/roles/${req.id}`, req);
  },
  deleteRole(id: string) {
    return del<null, null>(`roles/${id}`);
  },
};
export default apis;
