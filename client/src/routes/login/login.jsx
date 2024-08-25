import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // it disables the login button so that multiple login request are not send when the db is checking for the credentials

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    // const email = formData.get("email");
    const password = formData.get("password");
    //console.log(username, email, password);
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      //console.log(res);
      navigate("/"); // naviagate to the homepage
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
