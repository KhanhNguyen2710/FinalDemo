import { useSelector } from "react-redux";
import { AuthEmail } from "../redux/AuthReducer";

const AdminHide = ({ children }) => {
  const adminEmail = useSelector(AuthEmail);
  console.log("email", adminEmail);
  if (adminEmail === "khanh@test.com") {
    return children;
  }
  return null;
};

export default AdminHide;
 