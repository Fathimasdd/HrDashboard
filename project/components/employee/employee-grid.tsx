"use client";

import { useEffect } from "react";
import { useEmployeeStore } from "@/lib/store";
import { EmployeeCard } from "@/components/employee/employee-card";
import { FilterBar } from "@/components/employee/filter-bar";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeGrid() {
  const { 
    employees, 
    fetchEmployees, 
    isLoading, 
    error,
    searchTerm,
    departmentFilter,
    ratingFilter
  } = useEmployeeStore();
  
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  
  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter(employee => {
    // Search filter
    const searchFilter = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      employee.firstName.toLowerCase().includes(searchFilter) || 
      employee.lastName.toLowerCase().includes(searchFilter) || 
      employee.email.toLowerCase().includes(searchFilter) ||
      employee.department.toLowerCase().includes(searchFilter);
    
    // Department filter
    const matchesDepartment = departmentFilter.length === 0 || 
      departmentFilter.includes(employee.department as any);
    
    // Rating filter
    const matchesRating = ratingFilter.length === 0 || 
      ratingFilter.includes(employee.performance);
    
    return matchesSearch && matchesDepartment && matchesRating;
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <EmployeeCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-6 text-center">
        <p className="text-destructive font-medium">Error: {error}</p>
        <Button 
          variant="outline" 
          className="mt-2" 
          onClick={() => fetchEmployees()}
        >
          Retry
        </Button>
      </div>
    );
  }
  
  if (filteredEmployees.length === 0) {
    return (
      <div>
        <FilterBar />
        <div className="rounded-md bg-muted p-8 text-center">
          <p className="text-muted-foreground">No employees found matching your filters.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

function EmployeeCardSkeleton() {
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-40 mt-1" />
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 flex justify-between gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}

// Add the Button import for the error state
import { Button } from "@/components/ui/button";