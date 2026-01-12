export const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-SV', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
