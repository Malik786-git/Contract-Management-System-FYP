import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../axiosConfig";
import { authUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { emailRegex, passwrodRegex } from "../utils/regex-validations";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [loginFields, setLoginFields] = useState({
        email: '',
        password: '',
    });

    const onChangeInputs = (e: any) => {
        setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setAuthError("");
        if (emailRegex.test(loginFields.email)) {
            setLoading(true);
            try {
                const res = await AxiosInstance.post("/api/user/login", loginFields);
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
            setAuthError("Email is not valid");
        }
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="page-title">LOGIN</h1>
                    </div>
                    <br />
                    <span className="text-dark">{authError}</span>
                    <br />
                    <div className="col-md-6 col-10 mx-auto">
                        <form>
                            <input type="email" className='auth-input' name="email" value={loginFields.email} placeholder='Enter Your Email' onChange={onChangeInputs} />
                            <input type="password" className='auth-input' name="password" value={loginFields.password} placeholder='Enter Password' onChange={onChangeInputs} />
                            <button className="auth-btn bg-primary" disabled={loading} onClick={onSubmit}> {loading ? "loading..." : "Login"}</button>
                            <br />
                            <br />
                            <span className="text-dark">If you are not register <Link to={'/signup'}>singup</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;