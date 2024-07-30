import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const storedId = sessionStorage.getItem("userId");

  const logout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="header">
      <h1>
        <Link to="/RecipeList">Recipe Web Page</Link>
      </h1>
      <div className="showid">{<p>Welcome {storedId}!!</p>}</div>
      <div className="menu">
        <Link to="/RecipeAdd" className="link">
          Add Recipe
        </Link>
        <button onClick={logout} className="link" style={{ color: "black" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
