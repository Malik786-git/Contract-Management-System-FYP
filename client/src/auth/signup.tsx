import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, passwrodRegex } from "../utils/regex-validations";
import AxiosInstance from "../../axiosConfig";
import { authUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signupFields, setSignupFields] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const onChangeInputs = (e: any) => {
    setSignupFields({ ...signupFields, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setAuthError("");
    if (emailRegex.test(signupFields.email)) {
      if (passwrodRegex.test(signupFields.password)) {
        setLoading(true);
        try {
          const res = await AxiosInstance.post("/api/user/register", signupFields);
          if (res.status === 201) {
            dispatch(authUser(res.data));
            navigate("/");
          }
          setLoading(false);
        } catch (error: any) {
          setAuthError(error.response.data.message);
          setLoading(false);
        }

      } else {
        setAuthError("Password must contain alphabets and numerics \n Max length of password is 10 character");
      }

    } else {
      setAuthError("Email is not valid");
    }
  }

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="page-title">SIGNUP</h1>
          </div>
          <br />
          <span className="text-dark">{authError}</span>
          <br />
          <div className="col-md-6 col-10 mx-auto">
            <form>
              <input type="text" className='auth-input' name="name" value={signupFields.name} placeholder='Enter Your Name' onChange={onChangeInputs} />
              <input type="email" className='auth-input' name="email" value={signupFields.email} placeholder='Enter Your Email' onChange={onChangeInputs} />
              <input type="password" className='auth-input' name="password" value={signupFields.password} placeholder='Enter Password' onChange={onChangeInputs} />
              <input type="cpassword" className='auth-input' name="cpassword" value={signupFields.cpassword} placeholder='Confirm Password' onChange={onChangeInputs} />
              <button className="auth-btn bg-primary" disabled={loading} onClick={onSubmit}> {loading ? "loading..." : "Signup"}</button>
              <br />
              <br />
              <span className="text-dark">Already register <Link to={'/login'}>login</Link></span>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;