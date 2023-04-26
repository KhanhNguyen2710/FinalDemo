
import { useSelector } from "react-redux";
import { Authenticated } from "../redux/AuthReducer";

const RouteOnLogin = ({ children }) => {
  const isAuthenticated = useSelector(Authenticated); // redux


  if (isAuthenticated) {
    return children 
  }
  return null; // ẩn giá trị 
};

export default RouteOnLogin;
