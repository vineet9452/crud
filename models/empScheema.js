// models/employee.model.js

import mongoose from "mongoose";

// ✅ Define schema
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

// ✅ Check if already defined (for hot reload in Next.js)
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
