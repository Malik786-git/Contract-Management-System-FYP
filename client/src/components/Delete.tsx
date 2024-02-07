import React, { useState, useEffect } from "react";
import FormData from "./Type";
import { Button, Table } from "react-bootstrap";
import { useAppSelector } from "../hooks/redux-hooks";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import instance from "../../axiosConfig";
const Delete: React.FC = () => {
  const [records, setRecords] = useState<FormData[]>([]);
  const data = useAppSelector((state) => state?.contract?.data);
  const userId = useAppSelector((state) => state?.userAuth?.data?.user?._id);
  console.log(userId)

  useEffect(() => {
  
  }, []);
  const deleteContract = async (contractId : string)=>{
    try {
      const response =await instance.delete(`http://localhost:8000/api/contract/delete-contract/${contractId}/${userId}`)
      console.log(response)
    } catch (error) {
      console.log("delete error-->", error)
    }
  }
  return (
    <div>
      <h2>Delete</h2>
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
      {data && data.map((item,index)=>(
          <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.duration}</td>
              <td>{item.project_name}</td>
              <td>{item.budget}</td>
              <td style={{color: (item.status == "incomplete")? "red":"green"}}>{item.status}</td>
              <td>{moment(item.started_date).format('DD-MM-YYYY')}</td>
              <td>{moment(item.end_date).format('DD-MM-YYYY')}</td>
              <td>{item.user_id.name}</td>
              <td><RiDeleteBin6Line onClick={()=> deleteContract(item._id)} className="delete_icon" /></td>
          </tr> 
        ))}
        </tbody>
        </Table>
    </div>
  );
};

export default Delete;
