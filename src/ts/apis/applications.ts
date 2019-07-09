import { get, post, put, del } from '@/ts/apiMethods';
import { GetApplicationsResI, GetApplicationResI, PutApplicationReqI, PutApplicationResI, PostApplicationReqI, PostApplicationResI } from '@/ts/types/apis';
const apis = {
  getApplications() {
    return get<null, GetApplicationsResI>('/applications');
  },
  getApplication(id: string) {
    return get<null, GetApplicationResI>(`/applications/${id}`);
  },
  getSecret() {
    return get<any, string>('/applications/secret', {
      length: 32,
    });
  },
  putApplication(req: PutApplicationReqI) {
    return put<PutApplicationReqI, PutApplicationResI>(`/applications/${req.id}`, req);
  },
  postApplication(req: PostApplicationReqI) {
    return post<PostApplicationReqI, PostApplicationResI>('/applications', req);
  },
  deleteApplication(id: string) {
    return del<null, null>(`applications/${id}`);
  },
};
export default apis;
