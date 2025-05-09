"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function EmployeePage() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/get-emp");
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleNameChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
      setError("");
    } else {
      setError("Only letters and spaces are allowed in names");
    }
  };

  const handleEdit = (employee) => {
    setIsUpdate(true);
    setId(employee._id);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setAge(employee.age);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await fetch(`/api/delete-emp/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item._id !== id));
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !age)
      return setError("All fields are required");
    if (isNaN(age) || age <= 0) return setError("Please enter a valid age");

    const employeeData = { firstName, lastName, age };
    try {
      if (isUpdate && id) {
        const res = await fetch(`/api/edit-emp/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
        const updated = await res.json();
        if (updated?.success) {
          setData(
            data.map((item) =>
              item._id === id ? { ...item, ...employeeData } : item
            )
          );
        }
      } else {
        const res = await fetch("/api/add-emp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
        const newEmployee = await res.json();
        if (newEmployee?.success && newEmployee?.data) {
          setData([...data, newEmployee.data]);
        } else {
          console.error("Invalid response:", newEmployee);
        }
      }
    } catch (err) {
      console.error("Save failed:", err);
    }

    handleClear();
  };

  const handleClear = () => {
    setId(null);
    setFirstName("");
    setLastName("");
    setAge(0);
    setIsUpdate(false);
    setError("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label>First Name</label>
          <Input value={firstName} onChange={handleNameChange(setFirstName)} />
        </div>
        <div>
          <label>Last Name</label>
          <Input value={lastName} onChange={handleNameChange(setLastName)} />
        </div>
        <div>
          <label>Age</label>
          <Input
            type="number"
            value={age === 0 ? "" : age}
            onChange={(e) =>
              setAge(e.target.value === "" ? 0 : Number(e.target.value))
            }
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave}>{isUpdate ? "Update" : "Save"}</Button>
          <Button variant="destructive" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      // <div className="border rounded-md overflow-x-auto">
      //   <Table>
      //     <TableHeader>
      //       <TableRow>
      //         <TableHead>Sr.No</TableHead>
      //         <TableHead>ID</TableHead>
      //         <TableHead>First Name</TableHead>
      //         <TableHead>Last Name</TableHead>
      //         <TableHead>Age</TableHead>
      //         <TableHead>Actions</TableHead>
      //       </TableRow>
      //     </TableHeader>
      //     <TableBody>
      //       {Array.isArray(data) &&
      //         data.map((item, idx) => (
      //           <TableRow key={item._id}>
      //             <TableCell>{idx + 1}</TableCell>
      //             <TableCell>{item._id}</TableCell>
      //             <TableCell>{item.firstName}</TableCell>
      //             <TableCell>{item.lastName}</TableCell>
      //             <TableCell>{item.age}</TableCell>
      //             <TableCell>
      //               <div className="flex gap-2">
      //                 <Button
      //                   variant="outline"
      //                   onClick={() => handleEdit(item)}
      //                 >
      //                   Edit
      //                 </Button>
      //                 <Button
      //                   variant="destructive"
      //                   onClick={() => handleDelete(item._id)}
      //                 >
      //                   Delete
      //                 </Button>
      //               </div>
      //             </TableCell>
      //           </TableRow>
      //         ))}
      //     </TableBody>
      //   </Table>
      // </div>
        <div className="w-full overflow-x-auto">
  <div className="min-w-[600px]">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sr.No</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data) &&
          data.map((item, idx) => (
            <TableRow key={item._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="break-all">{item._id}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
</div>

    </div>
  );
}
