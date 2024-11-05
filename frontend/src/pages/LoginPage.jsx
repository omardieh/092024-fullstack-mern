import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useAuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_SERVER_URL;

function LoginPage(props) {
  const { setIsLoggedIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("All inputs are required");
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (!response.status === 200) {
      setErrorMessage("something went wrong");
      return;
    }
    localStorage.setItem("authToken", response.data.authToken);
    setIsLoggedIn(true);
    navigate("/projects");
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
