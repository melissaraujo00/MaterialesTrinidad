// hooks/location/useLocationFilters.ts
import { useState, useMemo, useCallback } from 'react';
import { Department, Municipality, District } from '@/types';

interface UseLocationFiltersProps {
  initialDepartmentId?: number;
  initialMunicipalityId?: number;
  departments: Department[];
  municipalities: Municipality[];
  districts: District[];
}

export function useLocationFilters({
  initialDepartmentId,
  initialMunicipalityId,
  departments,
  municipalities,
  districts
}: UseLocationFiltersProps) {

  const [selectedDepartment, setSelectedDepartment] = useState(
    initialDepartmentId?.toString() || ''
  );
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    initialMunicipalityId?.toString() || ''
  );

  const filteredMunicipalities = useMemo(() => {
    if (!selectedDepartment) return [];
    return municipalities.filter(
      m => m.department_id === Number(selectedDepartment)
    );
  }, [selectedDepartment, municipalities]);

  const filteredDistricts = useMemo(() => {
    if (!selectedMunicipality) return [];
    return districts.filter(
      d => d.municipality_id === Number(selectedMunicipality)
    );
  }, [selectedMunicipality, districts]);

  const handleDepartmentChange = useCallback((value: string) => {
    setSelectedDepartment(value);
    setSelectedMunicipality(''); // Reset municipality
  }, []);

  const handleMunicipalityChange = useCallback((value: string) => {
    setSelectedMunicipality(value);
  }, []);

  return {
    selectedDepartment,
    selectedMunicipality,
    filteredMunicipalities,
    filteredDistricts,
    handleDepartmentChange,
    handleMunicipalityChange
  };
}
