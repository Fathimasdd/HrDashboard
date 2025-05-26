import { useState, useMemo } from 'react';
import { Employee, Department } from '@/lib/store';

interface FilterOptions {
  searchTerm: string;
  departments: Department[];
  ratings: number[];
}

export function useEmployeeFilter(employees: Employee[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    departments: [],
    ratings: []
  });

  const setSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const toggleDepartmentFilter = (department: Department) => {
    setFilters(prev => {
      const isSelected = prev.departments.includes(department);
      return {
        ...prev,
        departments: isSelected
          ? prev.departments.filter(d => d !== department)
          : [...prev.departments, department]
      };
    });
  };

  const toggleRatingFilter = (rating: number) => {
    setFilters(prev => {
      const isSelected = prev.ratings.includes(rating);
      return {
        ...prev,
        ratings: isSelected
          ? prev.ratings.filter(r => r !== rating)
          : [...prev.ratings, rating]
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      departments: [],
      ratings: []
    });
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search filter
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = !filters.searchTerm || 
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower);
      
      // Department filter
      const matchesDepartment = filters.departments.length === 0 ||
        filters.departments.includes(employee.department as Department);
      
      // Rating filter
      const matchesRating = filters.ratings.length === 0 ||
        filters.ratings.includes(employee.performance);
      
      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, filters]);

  return {
    filters,
    filteredEmployees,
    setSearchTerm,
    toggleDepartmentFilter,
    toggleRatingFilter,
    resetFilters
  };
}