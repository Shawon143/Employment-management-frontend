import React, { useState } from "react";
import axios from "axios";
import "./addEmployee.css"; // Import the CSS file

const AddEmployee = ({ onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/employees", {
        name,
        position,
        number,
        address,
        monthlySalary,
      })
      .then((response) => {
        alert("Employee added successfully");
        onEmployeeAdded(response.data); // Call the callback to update the employee list
        setName("");
        setPosition("");
        setNumber("");
        setAddress("");
        setMonthlySalary("");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <div className="add-employee-container">
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Monthly Salary:
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
