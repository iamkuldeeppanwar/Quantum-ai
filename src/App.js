import { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Store } from "./states/store";

import { AdminProtectedRoute } from "./routes";
import { Header, SideNavBar, NotFound } from "./components";
import { AdminLoginScreen, Dashboard } from "./pages";
import Objectdetect from "./pages/Object detection/Objectdetect";
import ImageRecognize from "./pages/Image Recognize/ImageRecognize";
import SpeechText from "./pages/Speech To Text/SpeechText";

function App() {
  const { state } = useContext(Store);
  const { token } = state;

  const pageLocation = useLocation();

  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  // console.log({ isExpanded, token });
  return (
    <div className="main-wrapper">
      {isExpanded && token && (
        <div className="sidebar-overlay" onClick={sidebarHandler}></div>
      )}
      {token && (
        <div className="sidebar-wrapper">
          <SideNavBar isExpanded={isExpanded} />
        </div>
      )}
      <div
        className={`body-wrapper ${isExpanded ? "mini-body" : "full-body"} 
        ${token ? "" : "m-0"} d-flex flex-column`}
      >
        {/* {token && <Header sidebarHandler={sidebarHandler} />} */}
        <Routes location={pageLocation} key={pageLocation.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Ai/object-detect" element={<Objectdetect />} />
          <Route path="/Ai/image-prediction" element={<ImageRecognize />} />
          <Route path="/Ai/speech-recognize" element={<SpeechText />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
