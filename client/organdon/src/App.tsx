//pages
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";
import MyOrgans from "./components/MyOrgans";
import Announcement from "./pages/Announcement";

function App() {
  return (
    <div className=" overflow-hidden">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/myorgans" element={<MyOrgans />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
