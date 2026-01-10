import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

export default function AppLogoIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`flex items-center gap-3 select-none ${className}`}
            {...props}
        >
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                <GalleryVerticalEnd className="size-6" />
            </div>

            <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Cotiza<span className="text-blue-600 dark:text-blue-400">Sis</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Sistema empresarial
                </span>
            </div>
        </div>
    );
}
