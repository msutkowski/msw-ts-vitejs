import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { setupWorker, rest } from "msw";

const worker = setupWorker(
  rest.get("https://example.com/user/:userId", (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: "John",
        lastName: "Maverick",
      })
    );
  })
);

function prepare() {
  if (import.meta.env.DEV) {
    return worker.start();
  }

  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});