// Importation des modules
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Navbar from './components/Navbar/Navbar.jsx';
import Register from './pages/register/Register.jsx';

// Importation des pages
import Home from "./pages/home/Home";
import TestFormImage from "./pages/TestFormulaireImage/TestFormImage";
import ContactForm from "./pages/contact/ContactForm";
import Profile from "./pages/profile/Profile";
import ContactGet from "./pages/contact/ContactGet"
import ContactGetOne from "./pages/contact/ContactGetOne"
import AutreForm from "./pages/contact/Autre"

// App
function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/testForm" element={<TestFormImage />} />
        <Route path="/contact" element={<AutreForm />} />
        {/* <Route path="/contact" element={<AutreForm />} /> */}
        <Route path="/contact/msgReceived" element={<ContactGet />} />
        <Route path="/contact/msgReceived/:id" element={<ContactGetOne />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;