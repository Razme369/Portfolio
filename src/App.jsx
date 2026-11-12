import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/about">About</Link>{" "}
        <Link to="/education">Education</Link>{" "}
        <Link to="/skills">Skills</Link>{" "}
        <Link to="/projects">Projects</Link>{" "}
        <Link to="/contact">Contact</Link>{" "}

        {currentUser ? (
          <>
            <span className="nav-welcome">
             Welcome, {currentUser.name} ({currentUser.role})
            </span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;