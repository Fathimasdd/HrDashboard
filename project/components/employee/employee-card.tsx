"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/employee/star-rating";
import { Bookmark, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Employee, useEmployeeStore } from "@/lib/store";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const router = useRouter();
  const { toggleBookmark, promoteEmployee, bookmarkedEmployees, fetchEmployees } = useEmployeeStore();
  const isBookmarked = bookmarkedEmployees.includes(employee.id);
  
  const handleView = async () => {
    await fetchEmployees();
    router.push(`/employee/${employee.id}`);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar className="h-12 w-12">
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
          <p className="text-sm text-muted-foreground">{employee.email}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Age: {employee.age}</span>
            <Badge 
              variant="outline" 
              className="font-medium"
            >
              {employee.department}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Performance:</span>
            <StarRating rating={employee.performance} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button 
          variant={isBookmarked ? "default" : "outline"} 
          size="sm"
          onClick={() => toggleBookmark(employee.id)}
        >
          <Bookmark 
            className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} 
          />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => promoteEmployee(employee.id)}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
}