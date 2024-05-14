import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Stars from "../../components/icons/Frame 1.svg";
import mikeButton from "../../components/button icons/Mike.png";
import Loader from "../../components/button icons/Loader.png";

const SpeechText = () => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Recognize speech continuously
    recognition.interimResults = true; // Get interim results

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      setLoading(true);
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      // console.log("Transcript:", transcript);
      setTranscript(transcript);
      setLoading(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognition.start();
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ x: "100%" }}
    >
      <Container fluid className="p-3">
        <h2 className="d-flex justify-content-center">
          <span className="Ai_text">Ai </span>
          <span className="star_icons">
            <img src={Stars} alt="..." />
          </span>
          <span className="object_detect_text">Voice To text Converter</span>
        </h2>

        <div className="object_detect_card mt-3">
          <div className="speech_content_main">
            {/* <h3>
              Speak <span>Anything...</span>
            </h3> */}
            {loading ? (
              <div className="speech_text_loader">
                <img src={Loader} alt="..." />
              </div>
            ) : (
              <h3>
                {transcript ? (
                  <div>{transcript}</div>
                ) : (
                  <>
                    Speak <span>Anything...</span>
                  </>
                )}
              </h3>
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex flex-column">
              <button className="object_detect_btn" onClick={startRecording}>
                <img src={mikeButton} alt="..." />
              </button>
              <div className="text-center start_text">Start Recording</div>
              <div className="object_btn">
                Please click on the start button and watch your speech will
                convert into text
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default SpeechText;
