import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/utils/slices/profileSlices";
import { setToken } from "@/utils/slices/authSlice";

export default function LogoutModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("OrganDonation_User");
        localStorage.removeItem("OrganDonToken");
        localStorage.removeItem("Lat");
        localStorage.removeItem("Long");
        navigate("/login");
    }

    return (
        <div className="mt-10">
            <Button onClick={handleLogOut} variant={"destructive"} className="rounded-xl w-full">
                Agree
            </Button>
        </div>
    )
}