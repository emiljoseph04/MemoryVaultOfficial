import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";  // Navbar
import Footer from "./components/Footer";  // Footer
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import CapsuleDetail from "./pages/CapsuleDetail";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createcapsule" element={<CreateCapsule />} />
        <Route path="/edit/:id" element={<CreateCapsule />} /> {/* 👈 Added for Edit mode */}
        <Route path="/capsule/:id" element={<CapsuleDetail />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
