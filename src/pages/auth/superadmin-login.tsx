import { RootState } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SuperAdminLoginForm from "@/components/auth/superadmin-login-form";

export default function AdminLoginPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SuperAdminLoginForm />
      </div>
    </div>
  );
}
