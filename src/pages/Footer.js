import React from "react";
import { footerData } from "./constants";

const Footer = () => {

  return (
    <>
      <div className="footerDataUl">
        {footerData.map((val, index) => (
          <div key={index} className={val?.logo && "githubLogoLi"}>
            {val?.logo ? (
              <img src={require("../images/githubLogo.png")} alt="" />
            ) : (
              <span>{val.name}</span>
            )}
          </div>
        ))}
      </div>
      <div>
        <img
          className="githubLogo"
          src={require("../images/githubLogo.png")}
          alt=""
        />{" "}
        &copy; 2023 Github, Inc.
      </div>
    </>
  );
};

export default Footer;
