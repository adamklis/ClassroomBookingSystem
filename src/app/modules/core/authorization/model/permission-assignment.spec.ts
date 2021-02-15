import { PermissionGroup } from '../enum/permission-group.enum';
import { Permission } from '../enum/permission.enum';
import { PermissionAssignment } from './permission-assignment';
describe('permission-assignment', () => {
  it('should return true if permission is assigned to group', () => {
    // tslint:disable-next-line: no-string-literal
    expect(PermissionAssignment.isAssigned(PermissionAssignment['assignments'][0].permissions[0], PermissionGroup.ADMIN)).toEqual(true);
    expect(PermissionAssignment.isAssigned(Permission.USER_EDIT, PermissionGroup.BANNED)).toEqual(false);
  });
});
