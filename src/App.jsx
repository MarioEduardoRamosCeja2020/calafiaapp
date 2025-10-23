import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTabs from "./pages/MainTabs";
import ResetPassword from "./pages/ResetPassword"; // 👈 Tu componente nuevo

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
