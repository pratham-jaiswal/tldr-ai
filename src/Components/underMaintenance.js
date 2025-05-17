import React from "react";

const UnderMaintenance = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <div className="maintenance-content">
          <h1 className="maintenance-title">We'll Be Back Soon!</h1>
          <p className="maintenance-message">
            Our website is currently undergoing maintenance.
            <br />
            We appreciate your patience and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
