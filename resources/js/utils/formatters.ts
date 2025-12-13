// utils/formatters.ts
export const formatNIT = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 10) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  }
  if (numbers.length <= 13) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 10)}-${numbers.slice(10)}`;
  }

  return `${numbers.slice(0, 4)}-${numbers.slice(4, 10)}-${numbers.slice(10, 13)}-${numbers.slice(13, 14)}`;
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 4) return numbers;
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
};
