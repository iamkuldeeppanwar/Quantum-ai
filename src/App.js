import { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header, SideNavBar, NotFound } from "./components";
import { AdminLoginScreen, Dashboard } from "./pages";
import Objectdetect from "./pages/Object detection/Objectdetect";
import ImageRecognize from "./pages/Image Recognize/ImageRecognize";
import SpeechText from "./pages/Speech To Text/SpeechText";
import Chat from "./pages/Chat/Chat";
import { Store } from "./states/store";

function App() {
  const pageLocation = useLocation();
  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  const { state } = useContext(Store);
  const { token } = state;

  return (
    <div className="main-wrapper">
      {isExpanded && (
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
        {token && <Header sidebarHandler={sidebarHandler} />}
        <Routes location={pageLocation} key={pageLocation.pathname}>
          <Route path="/" element={<AdminLoginScreen />} />
          {token && (
            <>
              <Route path="/Ai-dashboard" element={<Dashboard />} />
              <Route path="/Ai/object-detect" element={<Objectdetect />} />
              <Route path="/Ai/image-prediction" element={<ImageRecognize />} />
              <Route path="/Ai/speech-recognize" element={<SpeechText />} />
              <Route path="/Ai/chat" element={<Chat />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
