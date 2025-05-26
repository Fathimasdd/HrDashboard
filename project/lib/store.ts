import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  address: {
    address: string;
    city: string;
    state?: string;
    postalCode: string;
  };
  department: string;
  performance: number;
};

export type Department = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Finance' | 'Product' | 'Design';

type EmployeeStore = {
  employees: Employee[];
  bookmarkedEmployees: number[];
  searchTerm: string;
  departmentFilter: Department[];
  ratingFilter: number[];
  isLoading: boolean;
  error: string | null;

  fetchEmployees: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  toggleDepartmentFilter: (department: Department) => void;
  toggleRatingFilter: (rating: number) => void;
  toggleBookmark: (employeeId: number) => void;
  promoteEmployee: (employeeId: number) => void;
  assignToProject: (employeeId: number) => void;
  resetFilters: () => void;
  addEmployee: (employee: Omit<Employee, "id">) => void;
};

// Random department generator
const getDepartment = (): Department => {
  const departments: Department[] = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Design'];
  return departments[Math.floor(Math.random() * departments.length)];
};

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      bookmarkedEmployees: [],
      searchTerm: '',
      departmentFilter: [],
      ratingFilter: [],
      isLoading: false,
      error: null,

      fetchEmployees: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('https://dummyjson.com/users?limit=20');
          
          if (!response.ok) {
            throw new Error('Failed to fetch employees');
          }
          
          const data = await response.json();
          
          // Enhance the data with department and performance ratings
          const enhancedEmployees = data.users.map((user: any) => ({
            ...user,
            department: getDepartment(),
            performance: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
          }));
          
          set({ employees: enhancedEmployees, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      setSearchTerm: (term) => set({ searchTerm: term }),
      
      toggleDepartmentFilter: (department) => {
        const currentFilters = get().departmentFilter;
        if (currentFilters.includes(department)) {
          set({ departmentFilter: currentFilters.filter(d => d !== department) });
        } else {
          set({ departmentFilter: [...currentFilters, department] });
        }
      },
      
      toggleRatingFilter: (rating) => {
        const currentFilters = get().ratingFilter;
        if (currentFilters.includes(rating)) {
          set({ ratingFilter: currentFilters.filter(r => r !== rating) });
        } else {
          set({ ratingFilter: [...currentFilters, rating] });
        }
      },
      
      toggleBookmark: (employeeId) => {
        const bookmarked = get().bookmarkedEmployees;
        if (bookmarked.includes(employeeId)) {
          set({ bookmarkedEmployees: bookmarked.filter(id => id !== employeeId) });
        } else {
          set({ bookmarkedEmployees: [...bookmarked, employeeId] });
        }
      },
      
      promoteEmployee: (employeeId) => {
        const employees = get().employees;
        set({
          employees: employees.map(emp => 
            emp.id === employeeId 
              ? { ...emp, performance: Math.min(emp.performance + 1, 5) } 
              : emp
          )
        });
      },
      
      assignToProject: (employeeId) => {
        // In a real app, this would assign the employee to a project
        // For now, we'll just log it
        console.log(`Employee ${employeeId} assigned to project`);
      },
      
      resetFilters: () => set({ searchTerm: '', departmentFilter: [], ratingFilter: [] }),

      addEmployee: (employee) => {
        const newId = Math.max(...get().employees.map(emp => emp.id)) + 1;
        const newEmployee = { ...employee, id: newId };
        
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }));
      },
    }),
    {
      name: 'employee-storage',
      partialize: (state) => ({ bookmarkedEmployees: state.bookmarkedEmployees }),
    }
  )
);