export interface Department {
  id: number;
  name: string;
}

export interface Municipality {
  id: number;
  name: string;
  department_id: number;
}

export interface District {
  id: number;
  name: string;
  municipality_id: number;
}

export interface LocationData {
  departments: Department[];
  municipalities: Municipality[];
  districts: District[];
}
