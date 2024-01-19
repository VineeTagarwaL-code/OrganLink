import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
export default function AuthNav() {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate("/login");
  };

  const handleSignUpClick = (): void => {
    navigate("/signup");
  };
  return (
    <nav className="absolute top-0 py-10 px-16 flex gap-6 justify-end w-screen">
      <Button
        className="bg-[#ed5757] font-semibold hover:text-[#ed5757] px-6 py-4"
        onClick={handleLoginClick}
      >
        <p>Log in</p>
      </Button>
      <Button
        className="bg-[#ed5757] font-semibold px-6 py-4 hover:text-[#ed5757]"
        onClick={handleSignUpClick}
      >
        <p>Signup</p>
      </Button>
    </nav>
  );
}
