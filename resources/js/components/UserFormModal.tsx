import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface User {
  id?: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  phoneNumber: string;
  password: string;
  role_id: number;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  user?: User | null;
}

export default function UserFormModal({ isOpen, closeModal, user }: Props) {
  const [formData, setFormData] = useState<User>({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    birthdate: new Date(),
    phoneNumber: "",
    password: "",
    role_id: 0,
  });

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]); // Estado para roles

  useEffect(() => {
    // Cargar los roles desde la API
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles"); // Ajusta esta URL según tu API
        const data = await response.json();
        setRoles(data); // Guardar los roles en el estado
      } catch (error) {
        console.error("Error al obtener los roles:", error);
        toast.error("Error al cargar los roles.");
      }
    };

    fetchRoles();
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.birthdate,
        phoneNumber: user.phoneNumber,
        password: user.password,
        role_id: user.role_id,
      });
    } else {
      setFormData({
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        birthdate: new Date(),
        phoneNumber: "",
        password: "",
        role_id: 0,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("birthdate", formData.birthdate ? formData.birthdate.toISOString().split("T")[0] : "");
    data.append("phoneNumber", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("role_id", String(formData.role_id));

    const successMessage = user?.id ? "Post Updated Successfully" : "Post Created Successfully";
    const errorMessage = user?.id ? "Failed to Updated " : "Failed to Created ";

    if (user?.id) {
      data.append("_method", "PUT");
      router.post(`/posts/${user.id}`, data, {
        onSuccess: () => {
          console.log("Usuario actualizado correctamente.");
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error("Error al actualizar:", errors);
          toast.success(errorMessage);
          console.error(errors.message || "Failed to submit post.");
        },
      });
    } else {
      router.post("/users", data, {
        onSuccess: () => {
          console.log("Usuario creado correctamente.");
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error("Error al crear usuario:", errors);
          toast.success(errorMessage);
          console.error(errors.message || "Failed to submit post.");
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl dark:bg-gray-800 dark:text-white">
        <h2 className="text-lg text-gray-950 font-semibold mb-4 dark:text-white">
        {user ? "Edit Post" : "Add Post"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Nombre</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Primer nombre</label>
            <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Apellido</label>
            <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Email</label>
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Fecha de nacimiento</label>
            <input
            type="date"
            name="birthdate"
            value={formData.birthdate ? formData.birthdate.toISOString().split("T")[0] : ""}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Telefono</label>
            <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Contraseña</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
            required
            />
        </div>
        <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Rol</label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
        </div>
        <div className="flex justify-end gap-2">
            <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
            {user ? "Update" : "Create"}
            </button>
        </div>
        </form>
    </div>
    </div>

  );
}


