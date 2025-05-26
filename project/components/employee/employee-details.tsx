"use client";

import { type Employee, useEmployeeStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/employee/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bookmark, Mail, MapPin, Phone, TrendingUp, Users } from "lucide-react";

// Mock data for the additional tabs
const mockProjects = [
  { id: 1, name: "Website Redesign", role: "Lead Developer", status: "In Progress" },
  { id: 2, name: "Mobile App", role: "Developer", status: "Completed" },
  { id: 3, name: "API Integration", role: "Technical Lead", status: "Planning" },
];

const mockFeedback = [
  { id: 1, date: "2025-03-15", from: "Jane Smith", rating: 4, comment: "Great team player, always delivers on time." },
  { id: 2, date: "2025-02-10", from: "Michael Brown", rating: 5, comment: "Exceptional problem-solving skills." },
  { id: 3, date: "2025-01-05", from: "Sarah Johnson", rating: 3, comment: "Good work, but could improve communication." },
];

export function EmployeeDetails({ employee }: { employee: Employee }) {
  const { bookmarkedEmployees, toggleBookmark, promoteEmployee } = useEmployeeStore();
  const isBookmarked = bookmarkedEmployees.includes(employee.id);
  
  // Generate a performance history with random data
  const performanceHistory = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - (i + 1) * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    rating: Math.max(1, Math.min(5, employee.performance + Math.floor(Math.random() * 3) - 1)),
    feedback: ["Excellent work", "Good progress", "Meeting expectations", "Needs improvement", "Performance issues"][
      Math.floor(Math.random() * 5)
    ],
  })).reverse();
  
  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback>
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl">
                {employee.firstName} {employee.lastName}
              </CardTitle>
              <CardDescription>
                <Badge className="mb-2">{employee.department}</Badge>
                <div className="mt-2">
                  <StarRating rating={employee.performance} />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid gap-4">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 opacity-70" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 opacity-70" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 opacity-70" />
                  <span className="text-sm">{employee.address.address}, {employee.address.city}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 opacity-70" />
                  <span className="text-sm">Age: {employee.age}</span>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    onClick={() => toggleBookmark(employee.id)}
                    className="flex-1"
                  >
                    <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => promoteEmployee(employee.id)}
                    className="flex-1"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Promote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabbed Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance History</CardTitle>
                  <CardDescription>
                    View the employee's performance over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performanceHistory.map(history => (
                    <div key={history.id} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{history.date}</h4>
                        <StarRating rating={history.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground">{history.feedback}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {employee.firstName} {employee.lastName} is a dedicated professional with expertise in {employee.department.toLowerCase()} operations.
                    With a consistent performance rating and commitment to excellence, they have been an important team member since joining the company.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Projects</CardTitle>
                  <CardDescription>
                    Current and past projects the employee has worked on.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockProjects.map(project => (
                      <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">Role: {project.role}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge
                            variant={
                              project.status === "Completed" ? "default" :
                              project.status === "In Progress" ? "secondary" : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>
                    Feedback received from managers and colleagues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockFeedback.map(item => (
                      <div key={item.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="font-medium">{item.from}</h4>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                          <StarRating rating={item.rating} />
                        </div>
                        <p className="text-sm text-muted-foreground">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 