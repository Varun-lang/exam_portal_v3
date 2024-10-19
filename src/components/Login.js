import axios from "axios";
import React, { useState } from "react";
import baseUrl from "./api/bootApi";
import Welcome from "./Welcome";
import "./css/Login.css"; // Import custom CSS
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

function Login() {
  const [currentComponent, setCurrentComponent] = useState("form");
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // State for user role

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCred(formData);
  };

  const checkCred = (data) => {
    const { email, password } = data; // Destructure to get email and password
    axios
      .post(`${baseUrl}/v2/checkLogin?email=${email}&password=${password}`)
      .then(
        (response) => {
          setName(response.data);
          getRole(); // Fetch user role after successful login
          setCurrentComponent("myComponent");
        },
        (error) => {
          toast.error(error.response.data); // Show toast error message
        }
      );
  };

  function getRole() {
    axios.get(`${baseUrl}/v2/getloggedRole`).then((response) => {
      setRole(response.data); // Assuming the response contains the role
    });
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      {currentComponent === "form" ? (
        <div
          className="card p-4 shadow bg-white"
          style={{ width: "90%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Welcome name={name} role={role} /> /*{ Pass the role to Welcome }*/
      )}
      <ToastContainer /> {/* Place the ToastContainer here */}
    </div>
  );
}

export default Login;
