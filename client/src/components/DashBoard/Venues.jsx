// Venues.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Venues.css";

const Venues = () => {
  return (
    <div className="venues-container">
      <div className="floor-container" id="first-floor">
        <h2>1st Floor</h2>
        {renderButtons(["105", "108", "110", "111", "112"], "first")}
      </div>

      <div className="floor-container" id="second-floor">
        <h2>2nd Floor</h2>
        {renderButtons(["205", "208", "210", "211", "212"], "second")}
      </div>

      <div className="floor-container" id="third-floor">
        <h2>3rd Floor</h2>
        {renderButtons(["305", "308", "310", "311", "312"], "third")}
      </div>

      <div className="floor-container" id="fourth-floor">
        <h2>4th Floor</h2>
        {renderButtons(["405", "408", "410", "411", "412"], "fourth")}
      </div>
    </div>
  );
};

const renderButtons = (buttonNames, floor) => {
  return buttonNames.map((buttonName, index) => (
    <Link to={`/calendar/${floor}`} key={index} className="venue-link">
      <button className="green-button">{buttonName}</button>
    </Link>
  ));
};

export default Venues;
