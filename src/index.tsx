import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import coolStore from "./store";
import "./utils/i18n";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);
