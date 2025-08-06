export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-SV', {
        style: 'currency',
        currency: 'USD',
    }).format(amount || 0);
};
