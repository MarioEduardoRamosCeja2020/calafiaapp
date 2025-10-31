// src/pages/MenuPage.jsx
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MenuPage = () => {
  const navigate = useNavigate();
  const userType = Number(localStorage.getItem("userType"));

  useEffect(() => {
    if (!userType) navigate("/"); // Si no hay usuario, regresa al inicio
  }, [userType, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={userType} />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MenuPage;
