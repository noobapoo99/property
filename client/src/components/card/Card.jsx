import { useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest"; // Assuming you have apiRequest set up
import "./card.scss";
import axios from "axios";

function Card({ item }) {
  // State to manage the message input
  const [message, setMessage] = useState("");

  // Handle typing in the message input field
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSavePost = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/users/save`,
        { postId: item.id },
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  // Handle form submission (send message)
  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8800/api/messages`,
        {
          text: message,
          receiverId: item.userId, // Assuming `item` contains the card user's ID
        },
        { withCredentials: true }
      );

      console.log("Message sent:", response.data);
      setMessage("");
      setError("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={handleSavePost}>
              <img src="/save.png" alt="Save Post" />
            </div>

            <div
              className="icon"
              onClick={() => {
                /* Handle opening chat UI */
              }}
            >
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Form */}
      <div className="messageInputContainer">
        <form onSubmit={handleChatSubmit}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={handleMessageChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Card;
