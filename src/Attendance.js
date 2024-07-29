import React, { useState, useEffect } from "react";
import axios from "axios";
import "./attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAttendanceData(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (attendanceData.length) {
      setAttendanceData((prevData) =>
        prevData.map((item) => ({
          ...item,
          present: selectAll,
        }))
      );
    }
  }, [selectAll]);

  const fetchAttendanceData = (date) => {
    axios
      .get(`http://localhost:5000/api/employees/attendance/${date}`)
      .then((response) => {
        const data = response.data.map((attendance) => ({
          id: attendance._id,
          present: attendance.present,
          overtimeHours: attendance.overtimeHours || 0,
          date: attendance.date,
        }));
        setAttendanceData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCheckboxChange = (id, isChecked) => {
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, present: isChecked } : item
      )
    );
  };

  const handleOvertimeChange = (id, hours) => {
    setAttendanceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, overtimeHours: hours } : item
      )
    );
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:5000/api/employees/attendance/update",
        attendanceData
      )
      .then((response) => {
        console.log(response.data);
        alert("Attendance updated successfully");
        setAttendanceData([]);
        setSelectAll(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="attendance-container">
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            Select All
          </label>
        </div>
        {employees.map((employee) => {
          const attendanceEntry = attendanceData.find(
            (item) => item.id === employee._id
          );
          return (
            <div key={employee._id} className="employee-entry">
              <div className="employee-info">
                <input
                  type="checkbox"
                  checked={attendanceEntry ? attendanceEntry.present : false}
                  onChange={(e) =>
                    handleCheckboxChange(employee._id, e.target.checked)
                  }
                />
                <span className="employee-name">{employee.name}</span>
                {attendanceEntry && attendanceEntry.present && (
                  <input
                    type="number"
                    value={attendanceEntry.overtimeHours}
                    onChange={(e) =>
                      handleOvertimeChange(employee._id, e.target.value)
                    }
                    className="overtime-input"
                    placeholder="Overtime Hours"
                  />
                )}
              </div>
            </div>
          );
        })}
        <button type="submit" className="submit-button">
          Save Attendance
        </button>
      </form>
    </div>
  );
};

export default Attendance;
