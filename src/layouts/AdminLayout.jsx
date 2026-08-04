import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-void">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
