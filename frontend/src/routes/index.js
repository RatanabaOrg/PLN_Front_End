import { Routes, Route } from "react-router-dom";
import React from "react";
import AccessHistory from "../pages/accessHistory";
import ModalProvider from "../contexts/modal";
import LastAccess from "../pages/lastAccess";
import RegistryArea from "../pages/areas/registryArea";
import VisualizeAreas from "../pages/areas/visualizeAreas";
import VisualizeUsers from "../pages/users/visualizeUsers";
import ApproveUsers from "../pages/users/approveUsers";

function RoutesApp() {
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
}

export default RoutesApp;
