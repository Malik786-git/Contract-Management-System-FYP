import React, { useState } from "react";
import AxiosInstance from "../../axiosConfig";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setAllContracts } from "../redux/contractSlice";

const Add = () => {
  const auth_user = useAppSelector((state) => state?.userAuth?.data);
  const dispatch = useAppDispatch();
  const [DurationSelector, setDurationSelector] = useState("M");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [formData, setFormData] = useState({
    project_name: "",
    duration: "",
    budget: "",
    started_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await AxiosInstance.post(`/api/contract/create-contract/${auth_user.user._id}`, {
        project_name: formData.project_name,
        duration: `${formData.duration}${DurationSelector}`,
        budget: formData.budget,
        started_date: formData.started_date,
        end_date: formData.end_date,
      });

      if (res.status === 201) {
        const route = (auth_user?.user?.role == "admin") ? "api/contract/all-contracts" : `/api/contract/user-contracts/${auth_user?.user?._id}`;
        const response = await AxiosInstance.get(route)
        dispatch(setAllContracts(response?.data?.contracts));
        alert("Contract Created Successfully!")
      }
      setLoading(false);
      setFormData({
        project_name: "",
        duration: "",
        budget: "",
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
      <div className="contianer">
        <div className="row">
          <div className="col-10">
            <div>
              <span>
                {authError}
              </span>
            </div>
            <form>
              <label className="text-start d-block" htmlFor="">Project Name</label>
              <input type="text" className='auth-input' name="project_name" value={formData.project_name} placeholder='Enter Project Name' onChange={handleChange} />
              <label className="text-start d-block" htmlFor="">Duration</label>
              <div className="d-flex gap-2">
                <input type="number" className='auth-input' name="duration" value={formData.duration} placeholder='How Many Months/Years Duration' onChange={handleChange} />
                <select name="duration_time" onChange={(e) => setDurationSelector(e.target.value)}>
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
              <button className="btn btn-primary" disabled={loading} onClick={handleSubmit}>{loading ? "Loading.." : "Create Contract"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
