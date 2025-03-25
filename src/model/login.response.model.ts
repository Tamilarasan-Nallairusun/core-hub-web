export interface LoginResponseModel{
    token:string;
    expiration:string;
    refershToken:string;
    tenantId:string;
    refershTokenExpires:string;
    userPermissions:Array<PermissionModel>;
}

export interface PermissionModel{
    permissionId:number;
    userAccessLevel:number;
    accessLevel:number
}