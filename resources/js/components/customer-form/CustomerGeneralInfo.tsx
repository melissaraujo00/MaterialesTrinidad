// resources/js/components/customer-form/CustomerGeneralInfo.tsx
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importar Select
import { UseFormReturn } from "react-hook-form";
import { CustomerFormData } from "@/schemas/customerSchema";

interface Props {
    form: UseFormReturn<CustomerFormData>;
}

export const CustomerGeneralInfo = ({ form }: Props) => {
    const { register, formState: { errors }, setValue, watch } = form; // Necesitamos setValue y watch para el Select

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Información General</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... Inputs anteriores (Name, Email, Phone, Nit) se mantienen igual ... */}
                <div className="space-y-2">
                    <Label className={errors.name && "text-red-500"}>Nombre Completo *</Label>
                    <Input {...register("name")} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className={errors.email && "text-red-500"}>Correo Electrónico</Label>
                    <Input type="email" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className={errors.phoneNumber && "text-red-500"}>Teléfono *</Label>
                    <Input {...register("phoneNumber")} />
                    {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className={errors.nit && "text-red-500"}>NIT</Label>
                    <Input {...register("nit")} />
                    {errors.nit && <p className="text-xs text-red-500">{errors.nit.message}</p>}
                </div>

                {/* NUEVO: Selector de Estado */}
                <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select onValueChange={(val: any) => setValue("status", val)} value={watch("status") || "activo"}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="activo">Activo</SelectItem>
                            <SelectItem value="inactivo">Inactivo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
