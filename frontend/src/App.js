import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/authContext";
import Chat from "./components/chat";

function App() {
  return (
      <Router>
        <AuthProvider>
          <RoutesApp />
          <Chat/>
        </AuthProvider>
      </Router>
  );
}

export default App;
