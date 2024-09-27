import { Routes, Route } from "react-router-dom";
import React from "react";
import AccessHistory from "../pages/accessHistory";
import ModalProvider from "../contexts/modal";
import LastAccess from "../pages/lastAccess";
import RegistryArea from "../pages/areas/registryArea";

function RoutesApp() {
  return (
    <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
          <Route path="/cadastrararea" element={<RegistryArea />} />
        </Routes>
    </ModalProvider>
      
  );
}

export default RoutesApp;
