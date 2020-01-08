import React from "react";

import "./style.scss";

const PopUp = ({ children }) => {
  return (
    <div className="popUp_container fixed inset-0 bg-popUp">
      <div className="popUp w-full h-full relative flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PopUp;
