import React, { useRef, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Stars from "../../components/icons/Frame 1.svg";
import uploadButton from "../../components/button icons/Upload.png";
import { useDropzone } from "react-dropzone";
import dropImage from "../../components/button icons/Picture.png";

const ImageRecognize = () => {
  const [image, setImage] = useState(null);
  // const [previewURL, setPreviewURL] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // setImage(acceptedFiles);
    // Do something with the files
    setImage(
      acceptedFiles.map((file) => ({
        file,
        previewURL: URL.createObjectURL(file), // Create preview URL for each file
      }))
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const handleImage = async (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreviewURL(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreviewURL(null);
  //   }
  // };

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
                <input
                  // onChange={handleImage}
                  id="fileInput"
                  {...getInputProps()}
                />

                {image ? (
                  <div>
                    {image.map(({ file, previewURL }) => (
                      <div key={file.name}>
                        <img
                          src={previewURL}
                          alt="Preview"
                          style={{ width: "100%" }}
                        />
                        <p>{file.name}</p>
                      </div>
                    ))}
                  </div>
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
                <ul>
                  <li>So many leaves are in the plant</li>
                  <li>Pot</li>
                  <li>White wall</li>
                </ul>
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
