import { Head } from '@inertiajs/react';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useLoginForm } from '@/Features/Auth/hooks/useLoginForm';
import { cn } from '@/lib/utils';

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

    const hasErrors = (errors.email || errors.password) && !showLockMessage;

    return (
        <AuthLayout title="Iniciar sesión" description="Ingrese sus credenciales para acceder a su cuenta" >
            <Head title="Iniciar sesión" />

            <form className="space-y-5" onSubmit={submit}>
                <div className="grid gap-4">
                    {/* Campo: Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-200">
                            Correo electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className={cn(
                                "bg-transparent",
                                errors.email && "border-destructive focus-visible:ring-destructive"
                            )}
                        />
                    </div>

                    {/* Campo: Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password" title="Contraseña" className="text-zinc-900 dark:text-zinc-200">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className={cn(
                                    "pr-10 bg-transparent",
                                    errors.password && "border-destructive focus-visible:ring-destructive"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Recordar y Olvido de contraseña */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none text-zinc-600 dark:text-zinc-400 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Recordar sesión
                            </label>
                        </div>
                        <TextLink
                            href={route('password.request')}
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100 underline-offset-4 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </TextLink>
                    </div>

                    {/* Mensaje de Bloqueo (Throttling) */}
                    {showLockMessage && (
                        <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                            <AlertCircle size={18} />
                            <span className="font-medium">Límite de intentos alcanzado. Intente más tarde.</span>
                        </div>
                    )}

                    {/* Mensaje de Error de Credenciales */}
                    {hasErrors && (
                        <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20 font-medium text-center">
                            Credenciales incorrectas. Por favor, intente nuevamente.
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Autenticando...
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
