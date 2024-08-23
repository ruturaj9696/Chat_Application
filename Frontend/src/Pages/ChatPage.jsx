import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chats");
      setChats(response.data);
    } catch (error) {
      console.log("Error!", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((message) => {
        return <div key={message._id}>{message.chatName}</div>;
      })}
    </div>
  );
};

export default ChatPage;
