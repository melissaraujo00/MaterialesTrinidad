// hooks/data/useDataTable.ts
import { useState, useMemo } from 'react';

interface UseDataTableOptions<T> {
  data: T[];
  initialPageSize?: number;
  searchableFields?: (keyof T)[];
}

export function useDataTable<T>({
  data,
  initialPageSize = 10,
  searchableFields = []
}: UseDataTableOptions<T>) {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filtrar datos por búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter((item) =>
      searchableFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [data, searchTerm, searchableFields]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Manejar valores null/undefined
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortBy, sortOrder]);

  // Paginar datos
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Resetear a página 1 cuando cambia la búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (field: keyof T) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return {
    // Datos procesados
    data: paginatedData,

    // Paginación
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setPageSize,

    // Búsqueda
    searchTerm,
    setSearchTerm: handleSearchChange,

    // Ordenamiento
    sortBy,
    sortOrder,
    handleSort,

    // Estadísticas
    totalRecords: sortedData.length,
    totalAllRecords: data.length
  };
}
