import { RootState } from "@/utils/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface OpenRouteProps {
  children: ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default OpenRoute;
