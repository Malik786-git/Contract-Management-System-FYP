import React, { useState, useEffect } from "react";
import FormData from "./Type";
import { BiSearch } from "react-icons/bi";

const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<FormData[]>([]);

  useEffect(() => {
    const storedRecords = JSON.parse(
      localStorage.getItem("AddItems") || "[]"
    ) as FormData[];
    setRecords(storedRecords);
  }, []);

  return (
    <div>
      <div className="dashboard">
        <h3>Contracts</h3>
        <div className="input-search">
          <div>
            <input placeholder="Search" />
          </div>

          <div className="input-search-icon">
            <BiSearch />
          </div>
        </div>
      </div>
      <ul className="dashboard-list">
        {records.map((record, index) => (
          <li key={index}>
            ID: {record.id}, Duration: {record.duration}, Project Name:{" "}
            {record.projectName}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
