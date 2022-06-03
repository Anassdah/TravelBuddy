import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [registration, setRegistration] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    city: undefined,
    country: undefined
  });
  const [active, setActive] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setRegistration((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const registerClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      await axios.post("/auth/register", registration);
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <body>
      <div className="login">
      <div className="lContainer">
      <h2 className="logo">Travel Buddy</h2>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className={`lInput ${!active ? "undisplay" : "display"}`}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="number"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className={`lInput ${!active ? "undisplay" : "display"}`}
        />
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className={`lInput ${!active ? "undisplay" : "display"}`}
        />
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className={`lInput ${!active ? "undisplay" : "display"}`}
        />
        <button disabled={loading} onClick={handleClick} className={`lButton ${active ? "undisplay" : "display"}`}>
          Login
        </button>
        <button disabled={loading} onClick={registerClick} className={`lButton ${!active ? "undisplay" : "display"}`} >
          Register
        </button>
        <button disabled={loading} onClick={() => setActive(!active)} className="lButton">
          Create account
        </button>
        
        
        {error && <span>{error.message}</span>}
      </div>
    </div>
    </body>
  );
};

export default Login;
