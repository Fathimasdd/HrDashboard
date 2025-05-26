import { notFound } from "next/navigation";
import { type Employee } from "@/lib/store";
import { EmployeeDetails } from "@/components/employee/employee-details";

// Random department generator
const getDepartment = (): string => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Design'];
  return departments[Math.floor(Math.random() * departments.length)];
};

async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      image: data.image,
      address: {
        address: data.address.address,
        city: data.address.city,
        postalCode: data.address.postalCode,
      },
      department: data.company.department,
      performance: Math.floor(Math.random() * 3) + 3, // Random performance between 3-5
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return null;
  }
}

export async function generateStaticParams() {
  // Fetch all employees to generate static paths
  const response = await fetch("https://dummyjson.com/users?limit=100");
  const data = await response.json();
  
  return data.users.map((user: any) => ({
    id: user.id.toString(),
  }));
}

export default async function EmployeeDetailsPage({ params }: { params: { id: string } }) {
  const employee = await getEmployee(params.id);
  
  if (!employee) {
    notFound();
  }
  
  return <EmployeeDetails employee={employee} />;
}