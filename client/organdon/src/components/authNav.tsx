import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import { Button } from "./ui/button";
export default function AuthNav() {
  const navigate = useNavigate();
  return (
    <nav className="absolute top-0  px-4 lg:px-8 flex gap-6 justify-between w-screen">
      <div>
        {/* <img src={} alt="logo" className="h-[150px] object-contain" /> */}
      </div>
      <div className="py-12 flex flex-nowrap  gap-2 lg:gap-6">
        <Button
          className="bg-[#ed5757] font-semibold hover:text-[#ed5757] lg:px-6 lg:py-4"
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>Log in</p>
        </Button>
        <Button
          className="bg-[#ed5757] font-semibold lg:px-6 lg:py-4 hover:text-[#ed5757]"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <p>Signup</p>
        </Button>
      </div>
    </nav>
  );
}
