import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};


export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [loginAttempts, setLoginAttempts] = useState(0);
    const [showLockMessage, setShowLockMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (loginAttempts >= 5) {
            setShowLockMessage(true);
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: () => {
                setLoginAttempts(0);
            },
            onError: () => {
                setLoginAttempts((prev) => prev + 1);
            },
        });
    };

    return (
        <AuthLayout title="Iniciar sesión" description="Ingrese su correo electrónico y contraseña a continuación para iniciar sesión">
            <Head title="Iniciar sesión" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Recordar</Label>


                            <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                ¿Has olvidado tu contraseña?
                            </TextLink>
                    </div>

                    {showLockMessage && (
                        <div className="text-center text-red-600 mt-4">
                            Has alcanzado el límite de intentos fallidos. Intenta nuevamente más tarde.
                        </div>
                    )}
                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing || showLockMessage}>
                        {processing && <span className="h-4 w-4 animate-spin" />}
                        Iniciar sesión
                    </Button>
                </div>
            </form>

            {(errors.email || errors.password) && (
                <div className="text-red-600 text-center mt-4">
                    Correo electrónico o contraseña incorrectos. Por favor, intente nuevamente.
                </div>
            )}
        </AuthLayout>
    );
}
