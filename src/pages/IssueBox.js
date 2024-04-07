import React from "react";
import Footer from "./Footer";
import { IssueBoxHeaderData } from "./constants";
import InfiniteScrollComponent from "./customInfinteScroll";

const IssueBox = () => {
  return (
    <>
      <div className="issueBoxContainer">
        <div className="header">
          <div className="left">
            <div>
              <img alt="issue" src={require("../icons/issue.png")} />
              <div>625 Open</div>
            </div>
            <div>
              <img alt="issue" src={require("../icons/check.jpeg")} />
              <div>625 Closed</div>
            </div>
          </div>
          <div className="right">
            {IssueBoxHeaderData.map((val, index) => (
              <div key={index}>
                {val.name}
                <img alt="" src={require("../icons/down.png")} />
              </div>
            ))}
          </div>
        </div>
        <InfiniteScrollComponent />
        <div className="protip">
          <strong>ProTip!</strong> What's not been updated in a month:{" "}
          <span> updated:&lt;2021-08-17.</span>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default IssueBox;
