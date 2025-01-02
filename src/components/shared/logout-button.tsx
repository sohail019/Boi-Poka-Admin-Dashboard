import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth-slice";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { userType } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logout());
    console.log("User type:", userType);
    if (userType === "admin") {
      console.log("Redirecting to /admin-login");
      navigateTo("/admin-login");
    } else if (userType === "superadmin") {
      console.log("Redirecting to /superadmin-login");
      navigateTo("/superadmin-login");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
