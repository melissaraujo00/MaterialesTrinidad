import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    const form = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
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

    // --- Lógica de Ubicación (Selectores Dependientes) ---
    const selectedDepartmentId = form.watch("department_id");
    const selectedMunicipalityId = form.watch("municipality_id");

    // Filtrar Municipios según Departamento
    const filteredMunicipalities = useMemo(() => {
        if (!selectedDepartmentId) return [];
        return municipalities.filter((m) => String(m.department_id) === String(selectedDepartmentId));
    }, [selectedDepartmentId, municipalities]);

    // Filtrar Distritos según Municipio
    const filteredDistricts = useMemo(() => {
        if (!selectedMunicipalityId) return [];
        return districts.filter((d) => String(d.municipality_id) === String(selectedMunicipalityId));
    }, [selectedMunicipalityId, districts]);

    // Resetear hijos cuando cambia el padre
    useEffect(() => {
        form.setValue("municipality_id", "");
        form.setValue("district_id", "");
    }, [selectedDepartmentId, form.setValue]);

    useEffect(() => {
        form.setValue("district_id", "");
    }, [selectedMunicipalityId, form.setValue]);


    // --- Envío del Formulario ---
    const submit = (data: CustomerFormData) => {
        router.post(route("customers.store"), data as any, {
            onSuccess: () => toast.success("Cliente creado correctamente"),
            onError: (errors) => {
                toast.error("Error al crear cliente, verifique los campos.");
                console.error(errors);
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
