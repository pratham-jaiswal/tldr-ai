import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import UnderMaintenance from "./Components/underMaintenance";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isUnderMaintenance = process.env.REACT_APP_MAINTENANCE_MODE === "true";

const CLERK_PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

root.render(
  <React.StrictMode>
    {isUnderMaintenance ? (
      <UnderMaintenance />
    ) : (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    )}
  </React.StrictMode>
);
