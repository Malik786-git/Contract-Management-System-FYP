import React, { useState, useEffect } from "react";
import AxiosInstance from "../../axiosConfig";

interface Contract {
  project_name: string;
  duration: string;
  budget: number;
  started_date: string; 
  end_date: string; 
}

const Dashboard: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get('/api/contract/all-contracts');
        setContracts(res.data.contracts);
      } catch (error: any) {
        console.error(error.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
    <div className="row">
      <div className="col-10 mx-auto">
        <div className="contract_table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Duration</th>
              <th>Budget</th>
              <th>Starting - Ending</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract, index) => (
              <tr key={index}>
                <td className="mx-2" style={{width: "200px"}}>{index + 1}</td>
                <td className="mx-2" style={{width: "200px"}}>{contract.project_name}</td>
                <td className="mx-2" style={{width: "200px"}}>{contract.duration}</td>
                <td className="mx-2" style={{width: "200px"}}>{contract.budget}</td>
                <td className="mx-2" style={{width: "200px"}}>{contract.started_date?.split("T")?.[0]}</td>
                <td className="mx-2" style={{width: "200px"}}>{contract.end_date?.split("T")?.[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default Dashboard;
