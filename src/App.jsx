import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //serve per la navigazione tra le pagine
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/user" element={<UserPage></UserPage>} />
          <Route path="/admin" element={<AdminPage></AdminPage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
