import React, { useRef, useState } from "react";
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
            // handle the recorded data, you can save it or do whatever you want
            console.log("Recorded data:", event.data);
          };

          mediaRecorderRef.current = mediaRecorder;

          // Start recording
          mediaRecorder.start();
          setRecording(true);

          const model = await cocoSsd.load();
          const predictions = await model.detect(videoRef.current);
          console.log(predictions);
          setPrediction(predictions);
        }
      } else {
        // Pause recording
        mediaRecorderRef.current.pause();
        setRecording(false);
        console.log(mediaRecorderRef.current);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = async () => {
    const stream = videoRef.current.srcObject;
    if (!stream) return; // No stream to stop

    // Get all tracks from the media stream and stop each track
    stream.getTracks().forEach((track) => {
      track.stop(); // Stop the track
    });

    // Clear the video element's srcObject to stop displaying the stream
    videoRef.current.srcObject = null;
    setRecording(false);
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
          <span className="object_detect_text">Object detection</span>
        </h2>

        <div className="object_detect_card mt-3">
          <div className="object_detect_flex">
            <div className="object_detect_camera">
              {/* {recording ? (
                <div className="d-flex align-items-center flex-column mt-3">
                  <img
                    className="record_frame_img"
                    src={recordFrame}
                    alt="..."
                  />
                  <div>Tap start record to detect object</div>
                  <div className="camera_permission_txt">
                    Permission: turn on your video camera
                  </div>
                </div>
              ) : (
                <video
                  className="camera_detect"
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  // style={{ display: "block" }}
                />
              )} */}
              <video
                className="camera_detect"
                ref={videoRef}
                autoPlay
                playsInline
                muted
                // style={{ display: "block" }}
              />
            </div>
            <div className="content_main">
              <h3 className="detection_text">Detections :</h3>
              <div className="detection_content">
                {prediction.length > 0 ? (
                  prediction.map((prediction, index) => {
                    return (
                      <ul key={index}>
                        <li>{prediction.class}</li>
                        <li>{Math.round(prediction.score * 100)}%</li>
                      </ul>
                    );
                  })
                ) : (
                  <div className="p-2">No Data</div>
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
