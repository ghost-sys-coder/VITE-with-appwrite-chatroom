import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const { user, handleUserLogin } = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials({...credentials, [name]: value})
    }
    
    return (
        <div className='auth--container'>
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserLogin(e, credentials)}>
                    <div className="field--wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"
                            placeholder="Enter email"
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"
                            placeholder="Enter password..."
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <input className="btn btn--lg btn--main" type="submit" value="Login" />
                    </div>
                </form>
                <p>{"Don't have an account? Register"} <Link to={"/register"}>here</Link></p>
            </div>
        </div>
    )
};
export default Login;
