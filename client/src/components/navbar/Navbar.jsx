import "./navbar.css";
import { Link,useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <h2>Travel Buddy</h2>
        </Link>
        {user ?
        <div class="center">
          <h3>{user.username}</h3>
          <button className="navButton" onClick={() =>{localStorage.clear();navigate('/login') }}>logout</button>
        </div>
        : (
          <div className="navItems">
            <button className="navButton" onClick={() =>{navigate('/login') }}>Register</button>
            <button className="navButton" onClick={() =>{navigate('/login') }}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
