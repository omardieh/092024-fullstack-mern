import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setErrorMessage("All inputs are required");
      return;
    }
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    try {
      const createdUser = await axios.post(`${API_URL}/auth/signup`, {
        email,
        name,
        password,
      });
      if (createdUser.status === 201) navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
