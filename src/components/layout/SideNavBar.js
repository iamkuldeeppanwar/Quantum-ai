import "./SideNavBar.css";
import React, { useContext, useState } from "react";
import { Store } from "../../states/store";
import { Link, useNavigate } from "react-router-dom";
import Home from "../icons/Generate B.svg";
import ObjectDetection from "../icons/Selection fill A.svg";
import SpeechRecognize from "../icons/Voice gen.svg";
import imageDetection from "../icons/Image to image.svg";

const linkList = [
  {
    icon: <img className="icon-container" src={Home} alt="..." />,
    text: "Home",
    url: "/",
  },
  {
    icon: <img className="icon-container" src={ObjectDetection} alt="..." />,
    text: "Object detection",
    url: "/Ai/object-detect",
  },
  {
    icon: <img className="icon-container" src={SpeechRecognize} alt="..." />,
    text: "Speech to text",
    url: "/Ai/speech-recognize",
  },
  {
    icon: <img className="icon-container" src={imageDetection} alt="..." />,
    text: "Image recognize",
    url: "/Ai/image-prediction",
  },
];

const active_text = {
  Dashboard: "dashboard",
  Objectdetection: "Object detection",
  Speechtotext: "Speech to text",
  Imagerecognize: "Image recognize",
};

export default function SideNavbar({ isExpanded }) {
  const pathname = window.location.href.split("/").slice(-1);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = {
    userInfo: {
      fullname: "Codify",
      avatar:
        "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/2-Boy-512.png",
    },
  };
  const navigate = useNavigate();
  const signoutHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to Logout?") === true) {
      ctxDispatch({ type: "USER_SIGNOUT" });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const activeLinkHandler = (text) => {
    // console.log(pathname);
    return pathname.includes(active_text[text]);
  };

  const cls = `nav-item has-treeview ${
    isExpanded ? "menu-item" : "menu-item menu-item-NX"
  }`;
  return (
    <>
      {userInfo ? (
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
          }
        >
          <div className="brand-link">
            <Link to="/">
              <span
                className={`brand-text text-center ms-2 ${
                  !isExpanded && "d-none"
                } font-weight-light info-text`}
              >
                Quantum Ai
              </span>
            </Link>
          </div>

          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {linkList.map(({ icon, text, url }) => (
                  <li
                    key={url}
                    className={`${cls} ${
                      activeLinkHandler(text) && "active-item"
                    }`}
                    onClick={() => setActiveLink(text)}
                  >
                    <Link to={url} className="nav-link">
                      {icon}
                      <p className="ms-2">{text}</p>
                    </Link>
                  </li>
                ))}

                {/* <li className={cls}>
                  <Link onClick={signoutHandler} to="/" className="nav-link">
                    <FaSignOutAlt className="icon-md" />
                    <p className="ms-2">Log Out</p>
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}