import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FormData from "./Type";

const Add = () => {
  const [records, setRecords] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    duration: "",
    projectName: "",
    budget: "",
    startDate: "",
    status: "",
    endDate: "",
    completed: "",
    incomplete: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setRecords((prevRecords) => [...prevRecords, formData]);
    setFormData({
      id: "",
      duration: "",
      projectName: "",
      budget: "",
      startDate: "",
      status: "",
      endDate: "",
      completed: "",
      incomplete: "",
    });
    localStorage.setItem("AddItems", JSON.stringify(records));

    alert("Record added!");
  };
  return (
    <>
      <div className="container-box">
        <div className="input-field">
          <p>ID</p>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <p>Duration</p>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container-box">
        <div className="input-field">
          <p>Project Name</p>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <p>Budget</p>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container-box">
        <div className="input-field">
          <p>Start Date</p>
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <p>Status</p>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container-box">
        <div className="input-field">
          <p>End Date</p>
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="input-field d-flex ">
          <div>
            <p>Completed</p>
            <input
              type="text"
              name="completed"
              value={formData.completed}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Incomplete</p>
            <input
              type="text"
              name="incomplete"
              value={formData.incomplete}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container-box">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default Add;
