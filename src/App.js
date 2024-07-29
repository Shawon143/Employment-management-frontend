import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails";
import Attendance from "./Attendance";
import AddEmployee from "./AddEmployee";
import UpdateDeleteEmployee from "./UpdateDeleteEmployee";
import { Container, Nav } from "./Styles"; // Import styled components

const App = () => {
  return (
    <Router>
      <Container>
        <h1>Employee Management</h1>
        <Nav>
          <ul>
            <li>
              <Link to="/">Attendance</Link>
            </li>
            <li>
              <Link to="/details">Employee Details</Link>
            </li>
            <li>
              <Link to="/add-employee">Add Employee</Link>
            </li>
          </ul>
        </Nav>

        <Routes>
          <Route path="/" element={<Attendance />} />
          <Route path="/details" element={<EmployeeDetails />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route
            path="/update-employee/:id"
            element={<UpdateDeleteEmployee />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
