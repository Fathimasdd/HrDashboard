import { EmployeeGrid } from "@/components/employee/employee-grid";

export default function Home() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage all employees and their performance metrics.
        </p>
      </div>
      <EmployeeGrid />
    </div>
  );
}