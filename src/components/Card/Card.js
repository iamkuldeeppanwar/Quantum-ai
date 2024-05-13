import React from "react";
import "./Card.css";

const Card = ({ children }) => {
  return <div className="dashboard_card">{children}</div>;
};

export default Card;
