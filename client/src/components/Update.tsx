import React, { useState, useEffect } from "react";
import FormData from "./Type";

const Update: React.FC = () => {
  const [records, setRecords] = useState<FormData[]>([]);

  useEffect(() => {
    const storedRecords = JSON.parse(
      localStorage.getItem("AddItems") || "[]"
    ) as FormData[];
    setRecords(storedRecords);
  }, []);

  return (
    <div>
      <h2>Update</h2>
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

export default Update;
