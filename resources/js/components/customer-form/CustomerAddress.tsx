import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormData } from "@/schemas/customerSchema";

interface Props {
    form: UseFormReturn<CustomerFormData>;
    departments: any[];
    filteredMunicipalities: any[];
    filteredDistricts: any[];
}

export const CustomerAddress = ({ form, departments, filteredMunicipalities, filteredDistricts }: Props) => {
    const { register, setValue, watch, formState: { errors } } = form;

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <MapPin className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Dirección y Ubicación</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Departamento */}
                <div className="space-y-2">
                    <Label className={errors.department_id && "text-red-500"}>Departamento *</Label>
                    <Select onValueChange={(val) => setValue("department_id", val)} value={watch("department_id")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept.id} value={String(dept.id)}>{dept.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.department_id && <p className="text-xs text-red-500">{errors.department_id.message}</p>}
                </div>

                {/* Municipio */}
                <div className="space-y-2">
                    <Label className={errors.municipality_id && "text-red-500"}>Municipio *</Label>
                    <Select
                        onValueChange={(val) => setValue("municipality_id", val)}
                        value={watch("municipality_id")}
                        disabled={!watch("department_id")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredMunicipalities.map((muni) => (
                                <SelectItem key={muni.id} value={String(muni.id)}>{muni.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.municipality_id && <p className="text-xs text-red-500">{errors.municipality_id.message}</p>}
                </div>

                {/* Distrito */}
                <div className="space-y-2">
                    <Label className={errors.district_id && "text-red-500"}>Distrito *</Label>
                    <Select
                        onValueChange={(val) => setValue("district_id", val)}
                        value={watch("district_id")}
                        disabled={!watch("municipality_id")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredDistricts.map((dist) => (
                                <SelectItem key={dist.id} value={String(dist.id)}>{dist.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.district_id && <p className="text-xs text-red-500">{errors.district_id.message}</p>}
                </div>
            </div>

            {/* Dirección Textual */}
            <div className="space-y-2">
                <Label className={errors.address && "text-red-500"}>Dirección Exacta *</Label>
                <Textarea {...register("address")} placeholder="Colonia, Calle, Número de casa..." className="resize-none" />
                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
            </div>

            <div className="space-y-2 mt-4">
                <Label>Referencia / Descripción (Opcional)</Label>
                <Input {...register("description")} placeholder="Frente a..." />
            </div>
        </div>
    );
};
