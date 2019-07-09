import applications from '@/ts/apis/applications';
import roles from '@/ts/apis/roles';
import users from '@/ts/apis/users';

const apis = {
  ...applications,
  ...roles,
  ...users,
};

export default apis;
