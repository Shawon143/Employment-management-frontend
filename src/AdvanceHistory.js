import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvanceHistory = ({ employeeId, month }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (month) {
      axios
        .get(
          `http://localhost:5000/api/employees/${employeeId}/advance/history/${month}`
        )
        .then((response) => {
          setHistory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching advance history:", error);
        });
    }
  }, [month, employeeId]);

  return (
    <div>
      <h4>Advance History</h4>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            Date: {entry.date}, Amount: {entry.amount}, Operation:{" "}
            {entry.operation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvanceHistory;
