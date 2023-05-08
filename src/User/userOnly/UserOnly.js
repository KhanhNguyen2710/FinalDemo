import { useSelector } from "react-redux";
import { AuthEmail } from "../../redux/AuthReducer";

const UserOnly = ({ children }) => {
  const UserEmail = useSelector(AuthEmail);
  console.log("UserEmail", UserEmail);
  if ( UserEmail ) {
    return children;
  }
  return null;
};

export default UserOnly;
