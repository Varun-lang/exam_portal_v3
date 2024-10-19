import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import "./css/Welcome.css"; // Import custom CSS
import { useNavigate } from "react-router";
import LogoutC from "./LogoutC";

function Welcome({ name, role }) {
  const navigate = useNavigate();

  function handleAdmin() {
    navigate("/admin");
  }

  function handleStudent() {
    navigate("/student");
  }

  return (
    <div className="welcome-container d-flex justify-content-center align-items-center">
      <div
        className="text-center p-5 rounded shadow bg-white"
        style={{ width: "100%", maxWidth: "700px" }}
      >
        <h1 className="mb-4 display-4 text-primary">Welcome {name}</h1>
        <h2 className="mb-4 text-secondary">Select your role:</h2>
        <div className="d-flex justify-content-center">
          {role === "ROLE_SUPER_ADMIN" && (
            <>
              <button
                className="btn btn-warning me-2 btn-lg role-button"
                onClick={handleStudent}
              >
                <FaUserGraduate className="me-2" />
                Student
              </button>
              <button
                className="btn btn-dark btn-lg role-button"
                onClick={handleAdmin}
              >
                <FaUserShield className="me-2" />
                Admin
              </button>
            </>
          )}
          {role === "ROLE_ADMIN" && (
            <button
              className="btn btn-dark btn-lg role-button"
              onClick={handleAdmin}
            >
              <FaUserShield className="me-2" />
              Admin
            </button>
          )}
          {role === "ROLE_USER" && (
            <button
              className="btn btn-warning btn-lg role-button"
              onClick={handleStudent}
            >
              <FaUserGraduate className="me-2" />
              Student
            </button>
          )}
        </div>
      </div>
      <LogoutC />
    </div>
  );
}

export default Welcome;
