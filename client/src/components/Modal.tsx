import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { IContract, updateContract } from "../redux/contractSlice";
import AxiosInstance from "../../axiosConfig";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { addNewContract } from "../redux/contractSlice";

interface IModalProps {
    showModal: boolean,
    setShowModal: (s:boolean)=>void,
    contract?: IContract | null
}

export default function UpdateContractPortal(props:IModalProps) {
     const rec = props.contract;

     
    console.log(props.contract, 'edit data here.');
    const duration = props.contract?.duration;
    const parts = duration?.match(/(\d+)([A-Za-z]+)/);
    const numericPart = parts?.[1]; 
    const unitPart = parts?.[2];     



    const auth_user = useAppSelector((state) => state?.userAuth?.data);
    const dispatch = useAppDispatch();
    const [DurationSelector, setDurationSelector] = useState(unitPart || "M");
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [formData, setFormData] = useState({
      project_name:  rec?.project_name || "",
      duration: numericPart || "",
      budget: rec?.budget || 0,
      started_date: rec?.started_date || "",
      end_date: rec?.end_date || ""
    });


    useEffect(()=>{
    }, [props.contract])
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
  
    const handleSubmit = async (e:any)  => {
        e.preventDefault();
        setAuthError("");
            setLoading(true);
            try {
                const res = await AxiosInstance.patch(`/api/contract/update-contract/${props?.contract?._id}/${auth_user.user._id}`, {
                  project_name: formData.project_name,
                  duration: `${formData.duration}${DurationSelector}`,
                  budget: formData.budget,
                  started_date: formData.started_date,
                  end_date: formData.end_date,
                });
                
                if (res.status === 200) {
                  dispatch(updateContract(res.data.contract))
                  alert("Contract Update Successfully!")
                }
                setLoading(false);
                setFormData({
                  project_name: "",
                  duration: "",
                  budget: 0,
                  started_date: "",
                  end_date: "",
                })
            } catch (error: any) {
              console.log(error, 'redress');
              
                setAuthError(error.response.data.message);
                setLoading(false);
            }
    }
  



    return (
      <>
        {props.showModal && createPortal(
          <div className="modal">
          <div className="update_form">
          <span className="close" onClick={() => props.setShowModal(false)}>X</span>
          <form>
            <span>{authError}</span>
              <label className="text-start d-block" htmlFor="">Project Name</label>
              <input type="text" className='auth-input' name="project_name" value={formData.project_name} placeholder='Enter Project Name' onChange={handleChange} />
              <label className="text-start d-block" htmlFor="">Duration</label>
              <div className="d-flex gap-2">
                <input type="number" className='auth-input' name="duration" value={formData.duration} placeholder='How Many Months/Years Duration' onChange={handleChange} />
                <select name="duration_time" defaultValue={DurationSelector} onChange={(e)=>setDurationSelector(e.target.value)}>
                  <option value="M">Months</option>
                  <option value="Y">Year</option>
                </select>
              </div>
              <label className="text-start d-block" htmlFor="">Budget</label>
              <input type="number" className='auth-input' name="budget" value={formData.budget} placeholder='Enter Your Budget' onChange={handleChange} />

              <label className="text-start d-block" htmlFor="">Start date</label>
              <input type="date" className='auth-input' name="started_date" value={formData.started_date} placeholder='Enter Your Budget' onChange={handleChange} />

              <label className="text-start d-block" htmlFor="">End date</label>
              <input type="date" className='auth-input' name="end_date" value={formData.end_date} placeholder='Enter Your Budget' onChange={handleChange} />
              <br />
              <br />
              <button className="btn btn-primary" disabled={loading} onClick={handleSubmit}>{loading ? "Loading.." : "Update Contract"}</button>
            </form>
          </div>
        </div>,
          document.body
        )}
      </>
    );
  }
  

