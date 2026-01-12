import { usePage } from "@inertiajs/react";

// Hook base para obtener el array de permisos
export const usePermissions = () => {
    const page = usePage<any>(); // Usamos <any> para evitar errores de tipo con props.auth

    const permissions = page.props.auth?.user?.permissions;

    return Array.isArray(permissions) ? permissions : [];
}

export const useHasPermission = (permission: string) => {
    const permissions = usePermissions();
    return permissions.includes(permission);
}

export const useHasAllPermissions = (permissionList: string[]) => {
    const permissions = usePermissions();
    return permissionList.every(permission => permissions.includes(permission));
}
