import React, { useState, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Stars from "../../components/icons/Frame 1.svg";
import uploadButton from "../../components/button icons/Upload.png";
import { useDropzone } from "react-dropzone";
import dropImage from "../../components/button icons/Picture.png";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageRecognize = () => {
  const [predictions, setPredictions] = useState([]);
  const [selectImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => predict(image);
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const predict = async (image) => {
    setLoading(true);
    const model = await mobilenet.load();
    const predictions = await model.classify(image);
    setPredictions(predictions);
    setLoading(false);
  };

  useEffect(() => {
    setPredictions([]);
  }, [selectImage]);

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
          <span className="object_detect_text">Images recognize</span>
        </h2>

        <div className="object_detect_card mt-3">
          <div className="object_detect_flex">
            <div className="object_detect">
              <div className="drop_img_component" {...getRootProps()}>
                <input id="fileInput" {...getInputProps()} />

                {selectImage ? (
                  <img
                    src={selectImage}
                    alt="Preview"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div className="drop_image">
                    <img src={dropImage} alt="..." />
                    <div>
                      Drop your image here or{" "}
                      <span className="browse_img">Browse</span>
                    </div>
                    <div className="image_support_txt">
                      Supports: PNG, JPG, JPEG, WEBP
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="content_main">
              <h3 className="detection_text">Predections :</h3>
              <div className="detection_content">
                {predictions.length > 0 ? (
                  predictions.map((prediction, index) => {
                    return (
                      <ul key={index}>
                        <li>{prediction.className}</li>
                        <li>{Math.round(prediction.probability * 100)}%</li>
                      </ul>
                    );
                  })
                ) : (
                  <div className="p-2">
                    {loading ? "Loading..." : "No Data"}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex flex-column">
              <button
                className="object_detect_btn"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <img src={uploadButton} alt="..." />
              </button>
              <div className="text-center start_text">Upload image</div>
              <div className="object_btn">
                Please click Upload image button to upload your image to
                recognize
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default ImageRecognize;
