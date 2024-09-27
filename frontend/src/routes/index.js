import { Routes, Route } from "react-router-dom";
import React from "react";
import AccessHistory from "../pages/accessHistory";
import ModalProvider from "../contexts/modal";
import LastAccess from "../pages/lastAccess";

function RoutesApp() {
  return (
    <ModalProvider>
        <Routes>
          <Route path="/historico" element={<AccessHistory />} />
          <Route path="/ultimosacessos" element={<LastAccess />} />
        </Routes>
    </ModalProvider>
      
  );
}

export default RoutesApp;
