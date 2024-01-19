//pages
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
