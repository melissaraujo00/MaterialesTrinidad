// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';


import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

interface User {
    id: number;
    email: string;
    email_verified_at: string | null;
}

interface VerifyEmailProps {
    status?: string;
    user: User;
}

export default function VerifyEmail({ status, user }: VerifyEmailProps) {
    const { post, processing } = useForm();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    const isEmailVerified = user?.email_verified_at;

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Reenviar correo electrónico de verificación
                </Button>

                {/* Solo muestra el enlace de regreso al login si el correo no está verificado */}
                {!isEmailVerified && (
                    <TextLink href={route('login')} method="post" className="mx-auto block text-sm">
                        Regresar al inicio de sesión
                    </TextLink>
                )}

                {/* Si el correo ya está verificado, redirige automáticamente al dashboard */}
                {isEmailVerified && (
                    <TextLink href={route('dashboard')} className="mx-auto block text-sm">
                        Ir al Pagina Principal 
                    </TextLink>
                )}
            </form>
        </AuthLayout>
    );
}
