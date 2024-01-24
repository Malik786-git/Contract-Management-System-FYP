import React, { useState, useEffect } from "react";
import FormData from "./Type";
import { Button } from "react-bootstrap";

const Delete: React.FC = () => {
  const [records, setRecords] = useState<FormData[]>([]);

  useEffect(() => {
    const storedRecords = JSON.parse(
      localStorage.getItem("AddItems") || "[]"
    ) as FormData[];
    setRecords(storedRecords);
  }, []);

  const handleDelete = (id: number) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem("AddItems", JSON.stringify(updatedRecords));
  };

  return (
    <div>
      <h2>Delete</h2>
      <ul className="dashboard-list">
        {records.map((record, index) => (
          <li key={index}>
            ID: {record.id}, Duration: {record.duration}, Project Name:{" "}
            {record.projectName}{" "}
            <Button onClick={() => handleDelete(record.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delete;
