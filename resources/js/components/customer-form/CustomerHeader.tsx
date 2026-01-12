// resources/js/components/customer-form/CustomerHeader.tsx
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    title?: string;
    subtitle?: React.ReactNode; // ReactNode permite pasar JSX (spans, negritas)
}

export const CustomerHeader = ({
    title = "Nuevo Cliente",
    subtitle = "Complete la información para registrar un nuevo cliente."
}: Props) => (
    <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Link href={route('customers.index')}>
                <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {subtitle}
            </p>
        </div>
    </div>
);
