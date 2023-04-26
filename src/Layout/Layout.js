import { useSelector } from "react-redux";
import { AuthEmail } from "../redux/AuthReducer";

import WebLayout from "./webLayout/WebLayout";
import AdminPage from "./adLayout/AdminPage";

const AdLayout = ({ children }) => {
  const adminEmail = useSelector(AuthEmail);
  console.log("email", adminEmail);

  if (adminEmail === "khanh@test.com") {
    return <AdminPage />;
  } else{
    return <WebLayout />;
  }
};

export default AdLayout;
