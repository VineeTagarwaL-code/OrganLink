//pages
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";
import MyOrgans from "./components/MyOrgans";
import Announcement from "./pages/Announcement";

import OpenRoute from "./routes/OpenRoute";
import PrivateRoute from "./routes/ProtectedRoute";
import Chat from "./pages/Chat";
import Enquiries from "./pages/Enquires";

function App() {
  return (
    <div className=" overflow-hidden">
      <Routes>
        <Route path="/announcement" element={<Announcement />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/enquiries/:id"
          element={
            <PrivateRoute>
              <Enquiries />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/myorgans"
          element={
            <PrivateRoute>
              <MyOrgans />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
