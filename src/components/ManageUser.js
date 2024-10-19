import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "./api/bootApi";
import { toast, ToastContainer } from "react-toastify";

const ManageUser = ({ role }) => {
  console.log(role);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // State to hold roles
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch users and roles when the component mounts
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/v2/getUsers`);
        setUsers(userResponse.data); // Update users state

        const roleResponse = await axios.get(`${baseUrl}/v2/roles`); // Fetch roles
        setRoles(roleResponse.data); // Update roles state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (id, email) => {
    // Get the selected role and status for the user
    const selectedRoleId = document.querySelector(
      `select[data-user-id="${id}"]`
    ).value;
    const selectedStatus = document.querySelector(
      `input[name="status-${id}"]:checked`
    ).value;

    const isActive = selectedStatus === "active"; // Convert to boolean

    // Update user data on the server
    try {
      const params = new URLSearchParams();
      params.append("useremail", email);
      params.append("roleId", selectedRoleId);
      params.append("status", isActive);

      await axios.post(`${baseUrl}/v2/updateUser`, params);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user:", error);
    }
  };

  if (role !== "ROLE_SUPER_ADMIN") {
    return (
      <div className="alert alert-danger" role="alert">
        You are not authorized to access this page.
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="form-select"
                  data-user-id={user.id}
                  defaultValue={user.role && user.role.id ? user.role.id : ""}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div>
                  <label className="me-2">
                    <input
                      type="radio"
                      name={`status-${user.id}`}
                      value="active"
                      defaultChecked={user.status} // Set checked based on user status
                    />{" "}
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${user.id}`}
                      value="inactive"
                      defaultChecked={!user.status} // Set checked based on user status
                    />{" "}
                    Inactive
                  </label>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(user.id, user.email)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ManageUser;
