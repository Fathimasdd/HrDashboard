"use client";

import { useEffect } from "react";
import { useEmployeeStore, type Employee } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/employee/star-rating";
import { Bookmark, BookmarkX, Briefcase, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookmarksPage() {
  const { employees, bookmarkedEmployees, toggleBookmark, promoteEmployee, assignToProject, fetchEmployees, isLoading } = useEmployeeStore();
  
  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    }
  }, [employees.length, fetchEmployees]);
  
  // Get bookmarked employees
  const bookmarkedEmployeeDetails = employees.filter(e => 
    bookmarkedEmployees.includes(e.id)
  );
  
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground">
            Manage your bookmarked employees and perform quick actions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <BookmarkItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (bookmarkedEmployeeDetails.length === 0) {
    return (
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground">
            Manage your bookmarked employees and perform quick actions.
          </p>
        </div>
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No bookmarked employees</h3>
            <p className="text-muted-foreground text-center mt-2 max-w-md">
              You haven't bookmarked any employees yet. Browse the dashboard and bookmark employees to see them here.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/">Browse Employees</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <p className="text-muted-foreground">
          Manage your bookmarked employees and perform quick actions.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {bookmarkedEmployeeDetails.map(employee => (
          <BookmarkItem 
            key={employee.id} 
            employee={employee} 
            onRemove={toggleBookmark}
            onPromote={promoteEmployee}
            onAssignProject={assignToProject}
          />
        ))}
      </div>
    </div>
  );
}

function BookmarkItem({ 
  employee, 
  onRemove, 
  onPromote, 
  onAssignProject 
}: { 
  employee: Employee;
  onRemove: (id: number) => void;
  onPromote: (id: number) => void;
  onAssignProject: (id: number) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-14 w-14">
          <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
          <AvatarFallback>
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">
            {employee.firstName} {employee.lastName}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {employee.department}
            </Badge>
            <StarRating rating={employee.performance} />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {employee.email}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/employee/${employee.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </Button>
          <Button size="sm" variant="outline" onClick={() => onPromote(employee.id)}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Promote
          </Button>
          <Button size="sm" variant="outline" onClick={() => onAssignProject(employee.id)}>
            <Briefcase className="mr-2 h-4 w-4" />
            Assign
          </Button>
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={() => onRemove(employee.id)}
          >
            <BookmarkX className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BookmarkItemSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-48 mb-4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}