//pages
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyOrgans from "./components/MyOrgans";

function App() {
  return (
    <div className=" overflow-hidden">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/myorgans" element={<MyOrgans/>}/>
      </Routes>
    </div>
  );
}

export default App;
