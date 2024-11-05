import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, user } = useAuthContext();
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/projects">
            <button>Projects</button>
          </Link>
          <button onClick={() => localStorage.removeItem("authToken")}>
            Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
