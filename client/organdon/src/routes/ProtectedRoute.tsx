import { RootState } from "@/utils/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
