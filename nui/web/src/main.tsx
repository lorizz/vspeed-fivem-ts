import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterProvider } from "./providers/router.provider";
import { App } from "./App";
import { TrackProvider } from "./providers/track.provider";
import { GranularProvider } from "./providers/granular.provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <VisibilityProvider> */}
    <RouterProvider>
      <TrackProvider>
        <GranularProvider>
          <App />
        </GranularProvider>
      </TrackProvider>
    </RouterProvider>
    {/* </VisibilityProvider> */}
  </React.StrictMode>
);
