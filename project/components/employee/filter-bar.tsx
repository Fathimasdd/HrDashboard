"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, X } from "lucide-react";
import { useEmployeeStore, type Department } from "@/lib/store";

export function FilterBar() {
  const { departmentFilter, ratingFilter, toggleDepartmentFilter, toggleRatingFilter, resetFilters } = useEmployeeStore();
  
  const departments: Department[] = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Design'];
  const ratings = [1, 2, 3, 4, 5];
  
  const hasFilters = departmentFilter.length > 0 || ratingFilter.length > 0;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Filter className="mr-2 h-4 w-4" />
            Department
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by department</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {departments.map((department) => (
            <DropdownMenuCheckboxItem
              key={department}
              checked={departmentFilter.includes(department)}
              onCheckedChange={() => toggleDepartmentFilter(department)}
            >
              {department}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Filter className="mr-2 h-4 w-4" />
            Performance
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by performance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ratings.map((rating) => (
            <DropdownMenuCheckboxItem
              key={rating}
              checked={ratingFilter.includes(rating)}
              onCheckedChange={() => toggleRatingFilter(rating)}
            >
              {rating} {rating === 1 ? 'Star' : 'Stars'}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {hasFilters && (
        <>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {departmentFilter.map((dept) => (
              <Badge key={dept} variant="outline" className="gap-1">
                {dept}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => toggleDepartmentFilter(dept)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {dept} filter</span>
                </Button>
              </Badge>
            ))}
            {ratingFilter.map((rating) => (
              <Badge key={rating} variant="outline" className="gap-1">
                {rating} {rating === 1 ? 'Star' : 'Stars'}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => toggleRatingFilter(rating)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {rating} star filter</span>
                </Button>
              </Badge>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-destructive hover:text-destructive/90"
          >
            Clear All
          </Button>
        </>
      )}
    </div>
  );
}