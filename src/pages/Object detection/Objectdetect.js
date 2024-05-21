import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Stars from "../../components/icons/Frame 1.svg";
import startButton from "../../components/button icons/Sticker.png";
import pauseButton from "../../components/button icons/Pause.png";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
// import recordFrame from "../../components/button icons/RecordFrame.png";

const Objectdetect = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [prediction, setPrediction] = useState([]);

  const handleCameraClick = async () => {
    try {
      if (!recording) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = async (event) => {
            console.log("Recorded data:", event.data);
          };

          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.start();
          setRecording(true);

          const model = await cocoSsd.load();
          detectObjects(model); // Start initial detection immediately
        }
      } else {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.pause();
        }
        setRecording(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setRecording(false);
    }
  };

  const detectObjects = async (model) => {
    if (
      !recording ||
      !videoRef.current ||
      videoRef.current.videoWidth === 0 ||
      videoRef.current.videoHeight === 0
    ) {
      return;
    }

    const predictions = await model.detect(videoRef.current);
    setPrediction(predictions);
  };

  useEffect(() => {
    let intervalId;

    const runDetection = async () => {
      const model = await cocoSsd.load();
      intervalId = setInterval(() => detectObjects(model), 1000); // Adjust the interval as needed
    };

    if (recording) {
      runDetection();
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [recording]);

  // console.log(prediction);

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
          <span className="object_detect_text">Cell Phone detection</span>
        </h2>

        <div className="object_detect_card mt-3">
          <div className="object_detect_flex">
            <div className="object_detect_camera">
              <video
                className="camera_detect"
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
            </div>
            <div className="content_main">
              <h3 className="detection_text">Detections :</h3>
              <p>Put your cell phone in front of camera for detection</p>
              <div className="detection_content">
                {prediction.length > 0 ? (
                  prediction.map((prediction, index) => {
                    return (
                      <ul key={index}>
                        {prediction.score > 0 &&
                        prediction.class == "cell phone" ? (
                          <li>{prediction.class}</li>
                        ) : (
                          <li></li>
                        )}
                      </ul>
                    );
                  })
                ) : (
                  <div className="p-2"></div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex flex-column">
              {!recording ? (
                <>
                  <button
                    className="object_detect_btn"
                    onClick={handleCameraClick}
                  >
                    <img src={startButton} alt="..." />
                  </button>
                  <div className="text-center start_text">Start Recording</div>
                  <div className="object_btn">
                    Please click Upload image button to upload your image to
                    recognize
                  </div>
                </>
              ) : (
                <>
                  <button className="object_detect_btn" onClick={stopRecording}>
                    <img src={pauseButton} alt="..." />
                  </button>
                  <div className="text-center start_text">Stop Recording</div>
                  <div className="object_btn">
                    Please click Upload image button to upload your image to
                    recognize
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Objectdetect;
