import { useSelector } from "react-redux";
import { AuthEmail } from "../redux/AuthReducer";

const AdminOnly = ({ children }) => {
  const adminEmail = useSelector(AuthEmail);
  console.log("email", adminEmail);
  if (adminEmail === "khanh@test.com") {
    return children;
  }
  return null;
};

export default AdminOnly;
