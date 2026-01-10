import { Head } from '@inertiajs/react';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useLoginForm } from '@/Features/Auth/hooks/useLoginForm';

export default function Login() {
    const {
        data,
        setData,
        submit,
        processing,
        errors,
        showPassword,
        setShowPassword,
        showLockMessage
    } = useLoginForm();

    return (
        <AuthLayout title="Iniciar sesión" description="Ingrese sus credenciales para acceder a su cuenta" >
            <Head title="Iniciar sesión" />

            <form className="space-y-5" onSubmit={submit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            />
                            <label htmlFor="remember" className="text-sm font-medium text-zinc-600">
                                Recordar sesión
                            </label>
                        </div>
                        <TextLink href={route('password.request')} className="text-sm font-medium text-blue-600">
                            ¿Olvidaste tu contraseña?
                        </TextLink>
                    </div>

                    {showLockMessage && (
                        <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">
                            <AlertCircle size={18} />
                            <span>Límite de intentos alcanzado. Intente más tarde.</span>
                        </div>
                    )}

                    {(errors.email || errors.password) && !showLockMessage && (
                        <div className="p-3 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">
                            Credenciales incorrectas. Por favor, intente nuevamente.
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
