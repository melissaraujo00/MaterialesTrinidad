import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    data: any;
    setData: (field: string, value: any) => void;
    errors: Record<string, string>;
}

export const UserGeneralInfo = ({ data, setData, errors }: Props) => {
    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Datos Personales</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label className={errors.name && "text-red-500"}>Usuario (Login) *</Label>
                    <Input
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className={errors.name && "border-red-500"}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Nombres *</Label>
                    <Input
                        value={data.firstName}
                        onChange={e => setData('firstName', e.target.value)}
                    />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Apellidos *</Label>
                    <Input
                        value={data.lastName}
                        onChange={e => setData('lastName', e.target.value)}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Correo *</Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input
                        value={data.phoneNumber}
                        onChange={e => setData('phoneNumber', e.target.value)}
                    />
                    {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Fecha Nacimiento</Label>
                    <Input
                        type="date"
                        value={data.birthdate}
                        onChange={e => setData('birthdate', e.target.value)}
                        className="dark:[color-scheme:dark]"
                    />
                    {errors.birthdate && <p className="text-xs text-red-500">{errors.birthdate}</p>}
                </div>
            </div>
        </div>
    );
};
