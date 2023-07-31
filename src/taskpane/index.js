import AuthWrapper from "./AuthWrapper";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

initializeIcons();

let isOfficeInitialized = false;

const title = "SALIC :: Task Pane Add-in";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </HashRouter>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(AuthWrapper);
});

/* Initial render showing a progress bar */
render(AuthWrapper);

if (module.hot) {
  module.hot.accept("./AuthWrapper", () => {
    const NextApp = require("./AuthWrapper").default;
    render(NextApp);
  });
}
