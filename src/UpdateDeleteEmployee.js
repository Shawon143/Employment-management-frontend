import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "./Styles";
import EmployeeAdvance from "./EmployeeAdvance";
import "./updateDeleteEmployee.css"; // Import the CSS file

const UpdateDeleteEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = () => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee!", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        alert("Employee deleted successfully");
        // Redirect to employee details page or another page after deletion
      })
      .catch((error) => {
        console.error("There was an error deleting the employee!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/employees/${employee._id}`, employee)
      .then((response) => {
        alert("Employee updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the employee!", error);
      });
  };

  return (
    <div className="update-delete-container">
      <div className="form-section">
        <h2>Update/Delete Employee</h2>
        {employee && (
          <form onSubmit={handleSubmit} className="employee-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Monthly Salary:
              <input
                type="number"
                name="monthlySalary"
                value={employee.monthlySalary}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <div className="button-group">
              <Button type="submit" className="update-button">
                Update Employee
              </Button>
              <Button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Employee
              </Button>
            </div>
          </form>
        )}
      </div>
      <div className="advance-section">
        {employee && (
          <EmployeeAdvance
            employeeId={employee._id}
            currentAdvance={employee.advance}
            selectedMonth={employee.monthlySalary} // Pass selected month if applicable
            onAdvanceUpdate={fetchEmployee} // Refresh the employee details after advance update
          />
        )}
      </div>
    </div>
  );
};

export default UpdateDeleteEmployee;
