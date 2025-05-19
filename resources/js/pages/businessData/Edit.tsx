import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

export default function BusinessDataEdit() {
  const { businessData } = usePage<{
    businessData: {
      id: number;
      name: string;
      nit: string;
      address: string;
      phoneNumber: string;
      email: string;
      logo_path: string;
      description: string;
    };
  }>().props;

  const [preview, setPreview] = useState<string | null>(null);

 useEffect(() => {
    if (businessData.logo_path) {
      // Verificar si la ruta ya tiene el prefijo /storage o no
      if (businessData.logo_path.startsWith('/storage')) {
        setPreview(businessData.logo_path);
      } else {
        setPreview(`/storage/${businessData.logo_path}`);
      }
    }
  }, [businessData]);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Debe tener al menos 2 caracteres").required("Requerido"),
    nit: Yup.string().required("El NIT es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    phoneNumber: Yup.string().required("El teléfono es requerido"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es requerido"),
    description: Yup.string().max(255, "Máximo 255 caracteres").nullable(),
    logo: Yup.mixed()
      .nullable()
      .test("fileSize", "La imagen es muy grande", (value) => {
        return !value || (value instanceof File && value.size <= 2 * 1024 * 1024); // Máximo 2MB
      })
      .test("fileFormat", "Formato no soportado", (value) => {
        return !value || (value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
      }),
  });


   const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("nit", values.nit);
    data.append("address", values.address);
    data.append("phoneNumber", values.phoneNumber);
    data.append("email", values.email);
    data.append("description", values.description || "");

    if (values.logo && values.logo instanceof File) {
      data.append("logo_path", values.logo); // Cambio de "logo" a "logo_path" para que coincida con el backend
    }

    data.append("_method", "PUT");

    router.post(`/businessData/${businessData.id}`, data, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success("Información de la empresa actualizada con éxito.");
        }, 1000);
      },
      onError: (errors) => {
        console.log(errors);
        toast.error(Object.values(errors)[0]);
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Editar Datos de la Empresa" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Datos de la Empresa</h2>

        <Formik
          initialValues={{
            name: businessData.name,
            nit: businessData.nit,
            address: businessData.address,
            phoneNumber: businessData.phoneNumber,
            email: businessData.email,
            description: businessData.description,
            logo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldTouched }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la Empresa</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ej: Mi Empresa SA de CV"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              {/* NIT */}
              <div>
                <label htmlFor="nit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">NIT</label>
                <Field
                  type="text"
                  id="nit"
                  name="nit"
                  placeholder="Ej: 0614-123456-789-0"
                  value={values.nit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.nit && errors.nit && <small className="text-red-500">{errors.nit}</small>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Ej: Calle Principal #123, Ciudad"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.address && errors.address && <small className="text-red-500">{errors.address}</small>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Ej: 2222-1234"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.phoneNumber && errors.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ej: contacto@miempresa.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Breve descripción de la empresa"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white h-24"
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>

              {/* Logo Upload */}
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.currentTarget.files?.[0] ?? null;
                    setFieldValue("logo", file);
                    setFieldTouched("logo", true, false);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  onBlur={() => {
                    setFieldTouched("logo", true, false);
                  }}
                  className="mt-1 p-2 w-3/4 max-w-md"
                />
                {touched.logo && errors.logo && (
                  <div className="text-red-500 mt-1">{errors.logo}</div>
                )}

                {/* Logo Preview */}
                {preview && (
                  <div className="mt-3">
                    <p className="text-sm mb-1 dark:text-gray-300">Vista previa del logo:</p>
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="w-32 h-32 object-contain rounded-md border border-gray-300"
                      onError={(e) => {
                        console.error("Error al cargar la imagen:", e);
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Error+al+cargar";
                        console.log("URL que causó el error:", preview);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-start gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-400 text-white rounded px-4 py-2 hover:bg-orange-500 transition"
                >
                  Actualizar Información
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}