import React, { useEffect, useReducer } from "react";
import { timeAgo } from "./utils";

const defaultInitialState = {
  apiData: [],
  loading: true,
  errorMsg: "",
  dataPageNumber: 1,
  latestDataOnScroll: [],
};

const InfiniteScrollComponent = () => {
  const [state, setState] = useReducer(
    (previousState, currentState) => ({ ...previousState, ...currentState }),
    { ...defaultInitialState }
  );

  const { apiData, loading, errorMsg, dataPageNumber, latestDataOnScroll } =
    state;

  const fetchData = (dataPageNumber) => {
    const url = "https://api.github.com/repos/facebook/react/issues?page=";
    fetch(`${url}${dataPageNumber}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let data = res;
        setState({ loading: false });
        setState({ apiData: [...apiData, ...data] });
        setState({ latestDataOnScroll: data });
        return data;
      })
      .catch(function (error) {
        setState({ errorMsg: error.message });
      });
  };

  const fetchDataOnScrollHandler = () => {
    if (latestDataOnScroll.length === 30) {
      setState({ dataPageNumber: dataPageNumber + 1 });
      fetchData(dataPageNumber + 1);
    } else {
      setState({ loading: false });
      return null;
    }
  };

  const handleScroll = (e) => {
    if (
      !loading &&
      e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight
    ) {
      setState({ loading: true });
      fetchDataOnScrollHandler();
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <>
      <div className="box" onScroll={handleScroll}>
        {errorMsg ? (
          <p className="errorMsg">Error: {errorMsg}</p>
        ) : (
          <ul>
            {apiData.map((dataObj, index) => (
              <li key={index} className="issueLi">
                <div className="left">
                  <img alt="issue" src={require("../icons/issue.png")} />
                  <div className="leftContent">
                    <span className="title">{dataObj.title}</span>
                    <ul className="statusTags">
                      {dataObj?.labels?.map((val, index) => (
                        <li
                          key={val?.id || index}
                          style={{ background: `#${val?.color}` }}
                          className="tags tooltip"
                        >
                          {val?.name}
                          <span className="tooltiptext">
                            {val?.description || "No info Found"}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="timeline">
                      #{dataObj?.number} opened {timeAgo(dataObj?.created_at)}{" "}
                      by {dataObj.user?.login}
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="rightContent">
                    <div
                      className="display-inline"
                      style={{
                        visibility: dataObj.pull_request ? "visible" : "hidden",
                      }}
                    >
                      <img alt="pr" src={require("../icons/pr.png")} />
                      <span>{1}</span>
                    </div>

                    {dataObj?.assignees?.length > 0 && (
                      <div
                        className="display-inline"
                        style={{
                          visibility:
                            dataObj?.assignees?.length > 0
                              ? "visible"
                              : "hidden",
                        }}
                      >
                        <img
                          alt="githubLogo"
                          src={require("../images/githubLogo.png")}
                        />
                        <span>{dataObj?.assignees?.length}</span>
                      </div>
                    )}

                    <div
                      className="display-inline"
                      style={{
                        visibility:
                          dataObj?.comments > 0 ? "visible" : "hidden",
                      }}
                    >
                      <img
                        alt="comment"
                        src={require("../icons/comment.png")}
                      />
                      <span>{dataObj?.comments}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {loading && (
          <p className="loadingText">Please Wait. Data is loading...</p>
        )}
      </div>
    </>
  );
};

export default InfiniteScrollComponent;
