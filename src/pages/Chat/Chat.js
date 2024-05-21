import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

const Chat = () => {
  const name = sessionStorage.getItem("myname");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState([]);
  // State variable to indicate if data is loading
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);
  //alert(storedSessionValue);

  // const endOfMessagesRef = useRef(null);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const scrollToBottom = () => {
  //   endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, [state]); // Empty dependency array ensures this effect runs only once when the component mounts

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch(
        "https://quantumhostings.com/projects/websocket/public/api/message"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // Update state with the fetched data
      setMessages(jsonData.success);
      setLoading(false); // Data fetching completed
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Data fetching failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedSessionmyid = sessionStorage.getItem("myid");
    const storedSessionmyname = sessionStorage.getItem("myname");

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "https://quantumhostings.com/projects/websocket/public/api/messagepost",
        {
          // Pass the data to be inserted in the request body
          message: inputValue,
          username: storedSessionmyname,
        }
      );
      // Handle the response, if necessary
      console.log("Data inserted successfully:", response.data);
      if (state) {
        setState(false);
      } else {
        setState(true);
      }
      // Clear the input field after successful insertion
      setInputValue("");
    } catch (error) {
      // Handle errors
      console.error("Error inserting data:", error);
    }
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ x: "100%" }}
    >
      <Container fluid className="p-3">
        <h2 className="d-flex justify-content-center">Chats</h2>

        <div className="object_detect_card">
          <Row>
            <Col md={4}>
              <div className="user_container">
                {messages.length > 0 &&
                  messages.map((user) => {
                    return (
                      <div
                        key={user.id}
                        className="d-flex align-items-center user_info"
                      >
                        <img
                          className="avatar"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s"
                          alt="..."
                        />
                        <div>{user.username !== name && user.username}</div>
                      </div>
                    );
                  })}
              </div>
            </Col>
            <Col>
              <div className="chat_container">
                <div className="chat_input">
                  <div className="chat_box">
                    {messages.map((msg) => {
                      return (
                        <>
                          <div key={msg.id}>
                            {msg.username === name ? (
                              <div className="reciever">
                                <div className="chat_reciever">
                                  {msg.message}
                                </div>
                              </div>
                            ) : (
                              <div className="sender">
                                <div className="chat_sender">{msg.message}</div>
                              </div>
                            )}
                          </div>
                          {/* <div ref={endOfMessagesRef} /> */}
                        </>
                      );
                    })}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button className="chat_btn">
                      <IoMdSend />
                    </button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </motion.div>
  );
};

export default Chat;
