import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 dark:bg-zinc-950 md:p-10 transition-colors duration-300">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex items-center justify-center rounded-md">
                                <AppLogoIcon className="h-12 w-12 fill-current text-zinc-900 dark:text-zinc-50" />
                            </div>
                            <span className="sr-only">CotizaSis</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                                {title}
                            </h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>


                    <div className="text-zinc-900 dark:text-zinc-50">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
