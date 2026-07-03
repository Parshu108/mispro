import Sidenavbar from "./Component/Sidenavbar";
import Leftnavbar from "./Component/Leftnavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidenavbar/>

      <div className="flex-1">
        <Leftnavbar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
