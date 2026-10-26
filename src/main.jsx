/**
 * main.jsx – Entry point.
 * 1. Applies CSS theme variables from theme.config.js
 * 2. Injects Google Fonts link
 * 3. Sets <html> lang and dir from site.config.js
 * 4. Renders the React app inside BrowserRouter
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { applyTheme } from "@utils/applyTheme";
import siteConfig from "@config/site.config";
import themeConfig from "@config/theme.config";

// ── Apply theme variables ────────────────────────────────
applyTheme();

// ── Inject Google Fonts ──────────────────────────────────
const linkEl = document.createElement("link");
linkEl.rel   = "stylesheet";
linkEl.href  = themeConfig.googleFontsUrl;
document.head.appendChild(linkEl);

// ── Set HTML lang & dir ──────────────────────────────────
document.documentElement.lang = siteConfig.lang;
document.documentElement.dir  = siteConfig.dir;

// ── SEO: title & meta ────────────────────────────────────
document.title = siteConfig.seo.title;
const metaDesc = document.querySelector("meta[name='description']");
if (metaDesc) metaDesc.content = siteConfig.seo.description;

// ── Render ───────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
