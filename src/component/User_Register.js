import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function User_Register() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`https://localhost:7225/api/User/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: idRef.current.value,
          password: pwRef.current.value,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Registration success.");
          history("/");
          setIsLoading(false);
        } else if (res.status === 422) {
          alert("Already Exist same ID.");
          if (idRef.current) idRef.current.value = "";
          if (pwRef.current) pwRef.current.value = "";
          history("/Register");

          setIsLoading(false);
        }
      });
    }
  }

  const idRef = useRef(null);
  const pwRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <h1>Register Form</h1>
      <div className="input_area">
        <label>ID</label>
        <input type="text" ref={idRef}></input>
      </div>
      <div className="input_area">
        <label>PASSWORD</label>
        <input type="password" ref={pwRef}></input>
      </div>
      <button style={{ opacity: isLoading ? 0.3 : 1 }}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      <Link to="/" style={{ marginLeft: "10px", textDecoration: "none" }}>
        <button className="backbutton" type="button">
          Back to Login
        </button>
      </Link>
    </form>
  );
}
