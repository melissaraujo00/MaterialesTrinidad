import { useForm } from "react-hook-form";
// 1. CAMBIO: Importamos el resolver de YUP en lugar de Zod
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema, CustomerFormData } from "@/schemas/customerSchema";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

interface LocationProps {
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export const useCustomerForm = ({ departments, municipalities, districts }: LocationProps) => {

    // 2. CAMBIO: Configuramos useForm con yupResolver
    const form = useForm<CustomerFormData>({
        resolver: yupResolver(customerSchema), // <--- Aquí conectamos Yup
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            nit: "",
            department_id: "",
            municipality_id: "",
            district_id: "",
            address: "",
            description: "",
            status: "activo",
        },
    });

    // --- Lógica de Ubicación (Se mantiene idéntica) ---
    const selectedDepartmentId = form.watch("department_id");
    const selectedMunicipalityId = form.watch("municipality_id");

    const filteredMunicipalities = useMemo(() => {
        if (!selectedDepartmentId) return [];
        return municipalities.filter((m) => String(m.department_id) === String(selectedDepartmentId));
    }, [selectedDepartmentId, municipalities]);

    const filteredDistricts = useMemo(() => {
        if (!selectedMunicipalityId) return [];
        return districts.filter((d) => String(d.municipality_id) === String(selectedMunicipalityId));
    }, [selectedMunicipalityId, districts]);

    // Resetear selectores hijos
    useEffect(() => {
        form.setValue("municipality_id", "");
        form.setValue("district_id", "");
    }, [selectedDepartmentId, form.setValue]);

    useEffect(() => {
        form.setValue("district_id", "");
    }, [selectedMunicipalityId, form.setValue]);

    // --- Envío ---
    const submit = (data: CustomerFormData) => {
        router.post(route("customers.store"), data as any, {
            onSuccess: () => {
                toast.success("Cliente creado correctamente");
                form.reset(); // Opcional: limpiar form al guardar
            },
            onError: (errors) => {
                toast.error("Error al crear cliente, verifique los campos.");
                Object.keys(errors).forEach((field) => {
                    form.setError(field as any, {
                        type: "manual", // O 'server', da igual para efectos visuales
                        message: errors[field]
                    });
                });
            },
        });
    };

    return {
        form,
        submit: form.handleSubmit(submit),
        filteredMunicipalities,
        filteredDistricts,
        loading: form.formState.isSubmitting,
    };
};
