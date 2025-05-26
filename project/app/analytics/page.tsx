"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmployeeStore } from "@/lib/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { employees, bookmarkedEmployees } = useEmployeeStore();
  const [departmentData, setDepartmentData] = useState<any>(null);
  const [bookmarkData, setBookmarkData] = useState<any>(null);

  useEffect(() => {
    // Calculate department-wise average ratings
    const departmentRatings = employees.reduce((acc: { [key: string]: { sum: number; count: number } }, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { sum: 0, count: 0 };
      }
      acc[emp.department].sum += emp.performance;
      acc[emp.department].count += 1;
      return acc;
    }, {});

    const departmentAverages = Object.entries(departmentRatings).map(([dept, data]) => ({
      department: dept,
      average: data.sum / data.count,
    }));

    setDepartmentData({
      labels: departmentAverages.map(d => d.department),
      datasets: [
        {
          label: "Average Performance Rating",
          data: departmentAverages.map(d => d.average),
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
      ],
    });

    // Generate mock bookmark trend data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }).reverse();

    setBookmarkData({
      labels: last7Days,
      datasets: [
        {
          label: "Bookmarks Added",
          data: last7Days.map(() => Math.floor(Math.random() * 5) + 1),
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          tension: 0.4,
        },
      ],
    });
  }, [employees]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Average performance rating by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            {departmentData && (
              <Bar
                data={departmentData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5,
                    },
                  },
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookmark Trends</CardTitle>
            <CardDescription>
              Number of bookmarks added in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookmarkData && (
              <Line
                data={bookmarkData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Overview of employee and bookmark statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Employees</h3>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Bookmarked</h3>
                <p className="text-2xl font-bold">{bookmarkedEmployees.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Avg. Performance</h3>
                <p className="text-2xl font-bold">
                  {(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}