import { Package } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/schemas/productSchema"; // Importa tu interfaz

interface Props {
    form: UseFormReturn<ProductFormData>;
    categories: { id: number; name: string }[];
    brands: { id: number; name: string }[];
}

export const GeneralInfoCard = ({ form, categories, brands }: Props) => {
    const { register, formState: { errors }, setValue, watch } = form;

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Package className="h-5 w-5 text-blue-600" /> Información General
            </h3>

            <div className="space-y-2">
                <Label className={errors.name && "text-red-500"}>Nombre *</Label>
                <Input {...register("name")} placeholder="Ej: Cemento Portland" className={errors.name && "border-red-500 bg-red-50/10"} />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea {...register("description")} placeholder="Detalles técnicos..." className="resize-none h-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className={errors.category_id && "text-red-500"}>Categoría *</Label>
                    <Select value={watch("category_id") || ""} onValueChange={(val) => setValue("category_id", val, { shouldValidate: true })}>
                        <SelectTrigger className={errors.category_id && "border-red-500 ring-red-500"}><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {errors.category_id && <p className="text-xs text-red-500">{errors.category_id.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Marca (Opcional)</Label>
                    <Select value={watch("brand_id") || ""} onValueChange={(val) => setValue("brand_id", val)}>
                        <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                        <SelectContent>
                            {brands.map((b) => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
