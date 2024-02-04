import React, { useState, useEffect } from "react";
import FormData from "./Type";
import { BiSearch } from "react-icons/bi";
import instance from "../../axiosConfig";
import { useAppSelector } from "../hooks/redux-hooks";
import { Table } from "react-bootstrap";
import moment from "moment";

const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<FormData[]>([]);

  const {role, _id} = useAppSelector((state) => state.data.user)
  console.log("role", role)

  useEffect(() => {
    getContracts();
  }, []);
  const getContracts = async () => {
    try {
        const route = (role == "admin") ? "api/contract/all-contracts" : `/api/contract/user-contracts/${_id}`;
        const response = await instance.get(route)
        console.log("response", response.data.contracts)
        setRecords(response?.data?.contracts)
      } catch (error) {

}
    }
return (
  <div className="dashboard_container ">
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
    <Table className="dashboard_table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Duration</th>
            <th>Project Name</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Contractor</th>
          </tr>
        </thead>
        <tbody>
        {records.map((item,index)=>(
          <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.duration}</td>
              <td>{item.project_name}</td>
              <td>{item.budget}</td>
              <td style={{color: (item.status == "incomplete")? "red":"green"}}>{item.status}</td>
              <td>{moment(item.started_date).format('DD-MM-YYYY')}</td>
              <td>{moment(item.end_date).format('DD-MM-YYYY')}</td>
              <td>{item.user_id.name}</td>
          </tr> 
        ))}   
        </tbody>
      </Table>
      
  </div>
);
};

export default Dashboard;