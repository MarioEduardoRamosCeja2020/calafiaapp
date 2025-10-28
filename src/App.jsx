// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTabs from "./pages/MainTabs";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTabs />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
