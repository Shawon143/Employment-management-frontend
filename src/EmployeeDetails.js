import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, Button } from "./Styles";
import "./print.css";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    fetchEmployeeDetails(selectedMonth);
  }, [selectedMonth]);

  const fetchEmployeeDetails = (yearMonth) => {
    axios
      .get(`http://localhost:5000/api/employees/details/${yearMonth}`)
      .then((response) => {
        console.log("Fetched Employee Details:", response.data); // Debug log
        const details = response.data.map((employee) => {
          const totalDaysInMonth = new Date(
            parseInt(yearMonth.split("-")[0]),
            parseInt(yearMonth.split("-")[1]),
            0
          ).getDate();
          const salaryByPresent = Math.ceil(
            (employee.monthlySalary / totalDaysInMonth) * employee.totalPresent
          );
          const overtimeRatePerHour = Math.ceil(
            (employee.monthlySalary / 30 / 10) * 1.2
          );
          const earningsByOvertimeHours = Math.ceil(
            overtimeRatePerHour * employee.totalOvertimeHours
          );
          const bonus = employee.totalPresent === totalDaysInMonth ? 500 : 0;
          const totalAdvance = employee.advances.reduce(
            (sum, advance) => sum + advance.amount,
            0
          );
          const totalEarnings = Math.ceil(
            salaryByPresent + earningsByOvertimeHours + bonus - totalAdvance
          );

          return {
            ...employee,
            salaryByPresent,
            overtimeRatePerHour,
            earningsByOvertimeHours,
            bonus,
            advance: totalAdvance, // Sum of advances for the selected month
            totalEarnings,
          };
        });
        setEmployees(details);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error); // Debug log
      });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const formatMonthYear = (yearMonth) => {
    const [year, month] = yearMonth.split("-");
    const date = new Date(year, month - 1);
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <label>
        Select Month:
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </label>
      <Button onClick={handlePrint}>Print Salary Sheet</Button>
      <div id="printTable">
        <Table>
          <TableHead>
            <tr>
              <th colSpan="12" className="month-header">
                {formatMonthYear(selectedMonth)}
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Monthly Salary</th>
              <th>Total Present</th>
              <th>Total Absent</th>
              <th>Salary by Present</th>
              <th>Overtime Rate per Hour</th>
              <th>Overtime Hours</th>
              <th>Earnings by Overtime Hours</th>
              <th>Advance</th>
              <th>Bonus</th>
              <th>Total Earnings</th>
            </tr>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <Link to={`/update-employee/${employee._id}`}>
                    {employee.name}
                  </Link>
                </td>
                <td>{employee.position}</td>
                <td>{employee.monthlySalary}</td>
                <td>{employee.totalPresent}</td>
                <td>{employee.totalAbsent}</td>
                <td>{employee.salaryByPresent}</td>
                <td>{employee.overtimeRatePerHour}</td>
                <td>{employee.totalOvertimeHours}</td>
                <td>{employee.earningsByOvertimeHours}</td>
                <td>{employee.advance}</td>
                <td>{employee.bonus}</td>
                <td>{employee.totalEarnings}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeDetails;
