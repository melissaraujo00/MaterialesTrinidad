// hooks/forms/useFormSubmit.ts
import { useCallback } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

interface UseFormSubmitOptions {
  route: string;
  method?: 'post' | 'put';
  successMessage?: string;
  onSuccess?: () => void;
}

export function useFormSubmit({
  route,
  method = 'post',
  successMessage = 'Operación exitosa',
  onSuccess
}: UseFormSubmitOptions) {

  const handleSubmit = useCallback((values: any) => {
    const data = method === 'put'
      ? { ...values, _method: 'PUT' }
      : values;

    router.post(route, data, {
      onSuccess: () => {
        toast.success(successMessage);
        onSuccess?.();
      },
      onError: (errors) => {
        console.error('Errores de validación:', errors);
        const firstError = Object.values(errors)[0] as string;
        toast.error(firstError);
      },
    });
  }, [route, method, successMessage, onSuccess]);

  return { handleSubmit };
}
