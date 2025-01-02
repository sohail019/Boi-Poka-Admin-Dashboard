import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import AdminRegisterPage from "@/pages/auth/admin-register"

// Lazy load components
const AdminLoginPage = lazy(() => import("@/pages/auth/admin-login"));
const SuperAdminLoginPage = lazy(() => import("@/pages/auth/superadmin-login"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const UserPage = lazy(() => import('@/pages/users/'));
// const StudentDetailPage = lazy(() => import('@/pages/students/StudentDetailPage'));

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: <UserPage />,
        },
      ],
    },
  ];

  // Public routes
  const publicRoutes = [
    {
      path: "/admin-login",
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <AdminLoginPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: "/admin-register",
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <AdminRegisterPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: "/superadmin-login",
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <SuperAdminLoginPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  // Combine dashboard and public routes and pass them to `useRoutes`
  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
