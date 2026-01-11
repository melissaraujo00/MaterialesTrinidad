import { cn } from '@/lib/utils';

interface HeadingProps {
    title: string;
    description?: string;
    className?: string;
}

export default function Heading({ title, description, className }: HeadingProps) {
    return (
        <div className={cn('space-y-1', className)}>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
            </h1>
            {description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}
