import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  const handleLogout = async () => {
    try {
      await apiRequest.post("auth/logout");
      updateUser(null); // removes the info about the user basically clearing users info in localstorage
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    currentUser && (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <button>Update Profile</button>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img src={currentUser.avatar || "logo.png"} alt="" />
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <button>Create New Post</button>
            </div>
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
