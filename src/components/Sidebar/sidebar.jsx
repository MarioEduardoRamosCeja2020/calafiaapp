// src/components/Sidebar/Sidebar.jsx
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, People, BarChart, Settings, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, roles: [1, 2], path: "/menu/dashboard" },
    { text: "Usuarios", icon: <People />, roles: [1], path: "/menu/usuarios" },
    { text: "Reportes", icon: <BarChart />, roles: [1, 2], path: "/menu/reportes" },
    { text: "Configuración", icon: <Settings />, roles: [1], path: "/menu/configuracion" },
    { text: "Mi Perfil", icon: <AccountCircle />, roles: [2], path: "/menu/perfil" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", backgroundColor: "#00004e", color: "white" },
      }}
    >
      <List>
        {menuItems
          .filter(item => item.roles.includes(userType))
          .map(item => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
