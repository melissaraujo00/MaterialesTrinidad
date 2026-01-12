import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    data: any;
    setData: (field: string, value: any) => void;
    errors: Record<string, string>;
    roles: { name: string }[];
}

export const UserSecurity = ({ data, setData, errors, roles }: Props) => {
    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Seguridad</h3>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Rol del Sistema *</Label>
                    <Select
                        value={data.role}
                        onValueChange={(val) => setData('role', val)}
                    >
                        <SelectTrigger className={errors.role && "border-red-500"}>
                            <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>

                <div className="border-t border-dashed pt-4 dark:border-zinc-800 space-y-4">
                    <div className="space-y-2">
                        <Label>Nueva Contraseña (Opcional)</Label>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            placeholder="Dejar vacío para mantener actual"
                        />
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Confirmar Contraseña</Label>
                        <Input
                            type="password"
                            value={data.confirmPassword}
                            onChange={e => setData('confirmPassword', e.target.value)}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
