import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    title?: string;
    subtitle?: string;
}

export const UserHeader = ({
    title = "Nuevo Usuario",
    subtitle = "Asigna credenciales y roles para un nuevo miembro."
}: Props) => (
    <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Link href={route('users.index')}>
                <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {subtitle}
            </p>
        </div>
    </div>
);
