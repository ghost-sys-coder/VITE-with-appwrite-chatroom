import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { user, handleUserRegister } = useAuth();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials({ ...credentials, [name]: value})
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user])


    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserRegister(e, credentials)}>
                    <div className="field--wrapper">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required
                            placeholder="Enter name..."
                            value={credentials.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email"
                            placeholder="Enter email..."
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter password..."
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="Confirm password..."
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <button type="submit" className="btn btn--lg btn--main">Register</button>
                    </div>
                </form>
                <p>Already have an account? <Link to={"/login"}>here</Link></p>
            </div>
        </div>
    )
}

export default Register;