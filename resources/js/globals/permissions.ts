import { usePage } from "@inertiajs/react";

export const getPermissions = () => {
    const page = usePage();

    return page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions) ? page.props.auth.user.permissions : [];

}

export const hasPermission = (permission: string) => {
    const permissions = getPermissions();
    return permissions.includes(permission);
}

export const hasAllPermissions = (permissionList: string[]) => {
    const permissions = getPermissions();
    return permissionList.every(permission => permissions.includes(permission));
}

