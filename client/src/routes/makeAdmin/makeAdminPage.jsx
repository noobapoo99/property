import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest"; // Import your API request function

const MakeAdmin = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest.post("/admin/make-admin", { userId });
      setMessage(response.data.message); // Display success message
    } catch (err) {
      setMessage(err.response.data.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Make User an Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Make Admin</button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
};

export default MakeAdmin;
