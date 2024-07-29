import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceForm = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch all employees
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleAttendanceChange = (id, present) => {
    setAttendance({
      ...attendance,
      [id]: present,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceUpdates = Object.keys(attendance).map((id) => ({
      id,
      date: new Date().toISOString().split("T")[0],
      present: attendance[id],
      absence: !attendance[id],
    }));

    try {
      await axios.put(
        "http://localhost:5000/api/employees/attendance/update",
        attendanceUpdates
      );
      alert("Attendance updated successfully");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {employees.map((employee) => (
        <div key={employee._id}>
          <span>{employee.name}</span>
          <label>
            <input
              type="checkbox"
              checked={attendance[employee._id] || false}
              onChange={(e) =>
                handleAttendanceChange(employee._id, e.target.checked)
              }
            />
            Present
          </label>
        </div>
      ))}
      <button type="submit">Save Attendance</button>
    </form>
  );
};

export default AttendanceForm;
