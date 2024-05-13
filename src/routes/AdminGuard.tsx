import { roleExtractor } from "@app/utils/Processor";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  if (roleExtractor({ env: import.meta.env.VITE_ALLOED_ROLE_ADMIN_PAGES })) {
    return <Outlet />;
  }

  return <Navigate to={"/"} />;
};

export default AdminGuard;
