import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export function usePermissions() {
    const { auth } = usePage<PageProps>().props;
    const permissions = auth.user?.permissions ?? [];

    const useHasPermission = (perm: string) => permissions.includes(perm);

    return { useHasPermission };
}
