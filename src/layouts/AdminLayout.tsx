import { Outlet } from "react-router-dom";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

export default function AdminLayout() {
  return <AdminDashboardLayout outlet={<Outlet />} />;
}
