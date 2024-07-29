import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:5000/api/employees/${id}`)
        .then((response) => {
          alert("Employee deleted successfully");
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h3>Employee Information</h3>
      <p>Name: {employee.name}</p>
      <p>Position: {employee.position}</p>
      <p>Number: {employee.number}</p>
      <p>Address: {employee.address}</p>
      <p>Monthly Salary: {employee.monthlySalary}</p>
      <button onClick={() => navigate(`/update-employee/${employee._id}`)}>
        Update
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeInfo;
