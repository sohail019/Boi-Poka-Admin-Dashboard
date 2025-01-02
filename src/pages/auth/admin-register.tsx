// import UserAuthForm from "./components/user-auth-form";
import AdminRegisterForm from "@/components/auth/admin-register-form";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminRegisterPage() {
  const navigateTo = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center h-screen">
      <AdminRegisterForm />
    </div>
  );
}
