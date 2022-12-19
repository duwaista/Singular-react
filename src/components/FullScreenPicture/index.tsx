import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { AppState, actions } from "../../store/store";

const FullScreenPicture = (): JSX.Element => {
  const open = useSelector((state: AppState) => state.boolshit.fullScreenDialog);
  const picture = useSelector((state: AppState) => state.feed.picture);

  const dispatch = useDispatch();

  const closeFullScreen = () => {
    dispatch(actions.BoolShit.changeFullScreenDialog(false));
  };

  return (
    <div
      className={`fullscreen-container ${open ? "open" : ""}`}
      onClick={closeFullScreen}
    >
      {open && (
        <div className="fullscreen-content">
          <img
            alt="Full screen"
            className="fullscreen-picture"
            src={picture}
          />
        </div>
      )}
    </div>
  );
};

export default FullScreenPicture;
