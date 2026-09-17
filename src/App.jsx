import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrustedContacts from "./components/TrustedContacts/TrustedContacts";
import EmergencyHistory from "./pages/EmergencyHistory";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/trusted-contacts"
          element={
            <ProtectedRoute>
              <TrustedContacts />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/emergency-history"
          element={
            <ProtectedRoute>
              <EmergencyHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;