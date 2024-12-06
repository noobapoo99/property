import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import "./profileUpdatePage.scss";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar); // Initialize with the current user's avatar
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      // Check if avatar is correctly sent in the request
      console.log("Submitting Avatar:", avatar);
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar,
      });
      updateUser(res.data); // Update the user data in context
      navigate("/profile"); // Redirect to the profile page after successful update
    } catch (err) {
      console.log(err);
      setError(err.response.data.message); // Set the error message if the request fails
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username} // Prefill with current username
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email} // Prefill with current email
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="New password (optional)"
            />
          </div>
          <button>Update</button>
          {error && <span className="error">{error}</span>}{" "}
          {/* Display error message if any */}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar ? `${avatar}?v=${new Date().getTime()}` : "/avatar.png"} // Use cache-busting with the avatar URL
          alt="Profile Avatar"
          className="avatar"
        />

        {/* Avatar upload widget */}
        <UploadWidget
          uwConfig={{
            cloudName: "dquxoba5l",
            uploadPreset: "Estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={(result) => {
            console.log("Uploaded Avatar Result:", result); // Log the entire result object to inspect its structure
            if (result?.info?.secure_url) {
              console.log("Uploaded Avatar URL:", result.info.secure_url);
              setAvatar(result.info.secure_url); // Directly set the avatar state with the new URL
            } else {
              console.error(
                "Avatar upload failed: secure_url not found",
                result
              );
              setError("Failed to upload avatar. Please try again.");
            }
          }}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
