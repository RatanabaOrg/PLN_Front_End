import { Routes, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import AccessHistory from "../pages/accessHistory";
import ModalProvider from "../contexts/modal";
import LastAccess from "../pages/lastAccess";
import RegistryArea from "../pages/areas/registryArea";
import VisualizeAreas from "../pages/areas/visualizeAreas";
import VisualizeUsers from "../pages/users/visualizeUsers";
import ApproveUsers from "../pages/users/approveUsers";
import Login from "../pages/login"
import SignIn from "../pages/signIn"

function RoutesApp() {
  const { role, setRole } = useContext(AuthContext);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      setRole(null);
    } else {
      setRole(storedRole);
    }
  }, [setRole]);

  if (role === "adm") {
    return (
      <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
          <Route path="/cadastrararea" element={<RegistryArea />} />
          <Route path="/visualizarareas" element={<VisualizeAreas />} />
          <Route path="/visualizarusuarios" element={<VisualizeUsers />} />
          <Route path="/aprovarusuarios" element={<ApproveUsers />} />
        </Routes>
      </ModalProvider>
    );
  } else if (role === "funcionario") {
    return (
      <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
          <Route path="/visualizarareas" element={<VisualizeAreas />} />
        </Routes>
      </ModalProvider>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criarconta" element={<SignIn />} />
      </Routes>
    );
  }
}

export default RoutesApp;