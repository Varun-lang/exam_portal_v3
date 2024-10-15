import React from "react";
import { useNavigate } from "react-router-dom"; // Ensure this import is correct
import "./css/Home.css"; // Import custom CSS

function Home() {
  const navigate = useNavigate(); // Hook

  function HandleSignin() {
    navigate("/signin");
  }

  function HandleLogin() {
    navigate("/login");
  }

  return (
    <div className="home-container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card text-center p-4 shadow">
        <h1 className="mb-4 display-4 text-primary">Quizoo!</h1>
        <p className="text-muted mb-4" style={{ fontSize: "1.2rem" }}>
          Create, manage, track, and take quizzes in a fun and engaging
          environment.
        </p>
        <div className="button-group">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={HandleSignin}
          >
            Sign-up
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={HandleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
