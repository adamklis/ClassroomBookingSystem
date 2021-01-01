import { Permission } from '../enum/permission.enum';
import { PermissionGroup } from './../enum/permission-group.enum';
export class PermissionAssignment {
  private static assignments = [
    {
      permissionGroup: PermissionGroup.ADMIN,
      permissions: [
        Permission.APPLIANCE_EDIT,
        Permission.APPLIANCE_VIEW,
        Permission.RESERVATION_EDIT,
        Permission.RESERVATION_EDIT_USER,
        Permission.RESERVATION_VIEW,
        Permission.RESERVATION_VIEW_USER,
        Permission.ROOM_EDIT,
        Permission.ROOM_VIEW,
        Permission.SOFTWARE_EDIT,
        Permission.SOFTWARE_VIEW,
        Permission.USER_EDIT,
        Permission.USER_VIEW
      ]
    },
    {
      permissionGroup: PermissionGroup.TECHNICIAN,
      permissions: [
        Permission.APPLIANCE_EDIT,
        Permission.APPLIANCE_VIEW,
        Permission.RESERVATION_EDIT,
        Permission.RESERVATION_EDIT_USER,
        Permission.RESERVATION_VIEW,
        Permission.RESERVATION_VIEW_USER,
        Permission.ROOM_EDIT,
        Permission.ROOM_VIEW,
        Permission.SOFTWARE_EDIT,
        Permission.SOFTWARE_VIEW
      ]
    },
    {
      permissionGroup: PermissionGroup.USER,
      permissions: [
        Permission.APPLIANCE_VIEW,
        Permission.RESERVATION_EDIT_USER,
        Permission.RESERVATION_VIEW,
        Permission.RESERVATION_VIEW_USER,
        Permission.ROOM_VIEW,
        Permission.SOFTWARE_VIEW
      ]
    },
    {
      permissionGroup: PermissionGroup.BANNED,
      permissions: [
        Permission.RESERVATION_VIEW_USER
      ]
    },
    {
      permissionGroup: PermissionGroup.UNCONFIRMED,
      permissions: []
    }
  ];

  public static isAssigned(permission: Permission, group: PermissionGroup): boolean{
    const result = this.assignments.find(assignment => assignment.permissionGroup === group);
    return (result.permissions.findIndex(assignmentPermission => permission === assignmentPermission) !== -1);
  }

}
