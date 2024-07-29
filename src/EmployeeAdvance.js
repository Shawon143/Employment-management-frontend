import React, { useState } from "react";
import axios from "axios";
import "./employeeAdvance.css"; // Import the CSS file

const EmployeeAdvance = ({ employeeId, onAdvanceUpdate, selectedMonth }) => {
  const [advance, setAdvance] = useState("");
  const [operation, setOperation] = useState("add"); // Add or subtract
  const [date, setDate] = useState(""); // New state for date

  const handleAdvanceChange = (e) => {
    setAdvance(Number(e.target.value));
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/employees/${employeeId}/advance`, {
        advance,
        date, // Send date in "YYYY-MM-DD" format
        month: selectedMonth, // Send month in "YYYY-MM" format
        operation,
      })
      .then((response) => {
        alert("Advance updated successfully");
        setAdvance(""); // Reset advance input field after successful update
        setDate(""); // Reset date input field after successful update
        onAdvanceUpdate(); // Refresh the employee details after advance update
      })
      .catch((error) => {
        console.error("Error updating advance:", error);
      });
  };

  return (
    <div className="employee-advance-container">
      <h3>Update Advance</h3>
      <form onSubmit={handleSubmit} className="employee-advance-form">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="form-input"
            required
          />
        </label>
        <label>
          Update Advance:
          <input
            type="number"
            value={advance}
            onChange={handleAdvanceChange}
            placeholder="Enter amount"
            min="0"
            className="form-input"
            required
          />
        </label>
        <label>
          Operation:
          <select
            value={operation}
            onChange={handleOperationChange}
            className="form-select"
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </label>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeAdvance;
