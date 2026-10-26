/**
 * App.jsx – Root router and layout shell.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";
import Home    from "@pages/Home";
import Booking from "@pages/Booking";
import { useScrollToTop } from "@hooks/useScrollToTop";

function ScrollReset() {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </>
  );
}
