import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginSchema } from "@/schemas/auth/admin-schema";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth-slice";
import { InputPassword } from "../shared/password-validation";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios-instance";

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
  });
  const navigateTo = useNavigate();
  const onSubmit = async (data: z.infer<typeof AdminLoginSchema>) => {
    try {
      const response = await axiosInstance.post("/admin/login", data);
      console.log(response.data);
      const { token } = response.data;

      dispatch(login({token, userType: "admin"}));
      console.log("Login successful");

      navigateTo("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@boipoka.com"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                {/* 
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  required
                /> */}
                <InputPassword
                  value={watch("password") || ""}
                  onChange={(e) => setValue("password", e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="admin-register" className="underline underline-offset-4">
                Register
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default AdminLoginForm;
