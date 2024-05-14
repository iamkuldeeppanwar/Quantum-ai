import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Stars from "../components/icons/Frame 1.svg";
import "./Dashboard.css";
import Card from "../components/Card/Card";
import imageDetaction from "../components/icons/Image to image.svg";
import speedDetaction from "../components/icons/Voice gen.svg";
import objectDetection from "../components/icons/Selection fill A.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const redirectArray = [
    {
      header: "Discover Image Recognition with Quantum AI",
      content:
        "Quantum AI makes recognizing images simple. Our technology quickly identifies objects and scenes in your pictures",
      footer: <img src={imageDetaction} alt="..." />,
      path: "/Ai/image-prediction",
    },

    {
      header: "Simplify Voice-to-Text with Quantum AI",
      content:
        "Discover the ease of converting spoken words into text using Quantum AI. Our cutting-edge technology streamlines the process, enabling effortless transcription of your voice recordings.",
      footer: <img src={speedDetaction} alt="..." />,
      path: "/Ai/speech-recognize",
    },

    {
      header: "Simplified Object Detection with Quantum AI",
      content:
        "Quantum AI simplifies the process of identifying objects in images. Our cutting-edge technology quickly and accurately recognizes various objects within your images, offering practical solutions for a wide array of applications.",
      footer: <img src={objectDetection} alt="..." />,
      path: "/Ai/object-detect",
    },

    {
      header: "Discover Image Recognition with Quantum AI",
      content:
        "Quantum AI makes recognizing images simple. Our technology quickly identifies objects and scenes in your pictures",
      footer: <img src={imageDetaction} alt="..." />,
      path: "/Ai/speech-recognize",
    },

    {
      header: "Simplify Voice-to-Text with Quantum AI",
      content:
        "Discover the ease of converting spoken words into text using Quantum AI. Our cutting-edge technology streamlines the process, enabling effortless transcription of your voice recordings.",
      footer: <img src={speedDetaction} alt="..." />,
      path: "/Ai/speech-recognize",
    },

    {
      header: "Simplified Object Detection with Quantum AI",
      content:
        "Quantum AI simplifies the process of identifying objects in images. Our cutting-edge technology quickly and accurately recognizes various objects within your images, offering practical solutions for a wide array of applications.",
      footer: <img src={objectDetection} alt="..." />,
      path: "/Ai/object-detect",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        exit={{ x: "100%" }}
      >
        <Container fluid className="p-3">
          <div className="dashborad_welcome_text">
            <span className="welcome_to_text">Welcome to</span>{" "}
            <span className="quantum_ai_text">
              Quantum AI <img className="star_icon" src={Stars} alt="..." />
            </span>
            <br />
            Your Gateway to Intelligent Assistance
          </div>
          <div className={`d-flex flex-wrap gap-3`}>
            {redirectArray.map((content, index) => {
              return (
                <Card key={index}>
                  <div
                    onClick={() => {
                      navigate(content.path);
                    }}
                    className="content_head"
                  >
                    {content.header}
                  </div>
                  <div
                    onClick={() => {
                      navigate(content.path);
                    }}
                    className="content_main"
                  >
                    {content.content}
                  </div>
                  <div
                    onClick={() => {
                      navigate(content.path);
                    }}
                    className="content_foot"
                  >
                    {content.footer}
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </motion.div>
    </>
  );
};

export default Dashboard;
