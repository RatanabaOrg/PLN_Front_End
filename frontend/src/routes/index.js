import { Routes, Route } from "react-router-dom";
import React from "react";
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
  const role = localStorage.getItem("role");
  if (role == "adm") {
    return (
      <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
          <Route path="/cadastrararea" element={<RegistryArea />} />
          <Route path="/visualizarareas" element={<VisualizeAreas />} />
          <Route path="/visualizarusuarios" element={<VisualizeUsers />} />
          <Route path="/aprovarusuarios" element={<ApproveUsers />} />
          <Route path="/" element={<Login />} />
          <Route path="/criarconta" element={<SignIn />} />
        </Routes>
      </ModalProvider>

    );
  } else if (role == "funcionario") {
    return (
      <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
          <Route path="/visualizarareas" element={<VisualizeAreas />} />
          <Route path="/" element={<Login />} />
          <Route path="/criarconta" element={<SignIn />} />
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
