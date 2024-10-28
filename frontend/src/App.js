import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
      <Router>
        <AuthProvider>
          <RoutesApp />
        </AuthProvider>
      </Router>
  );
}

export default App;
