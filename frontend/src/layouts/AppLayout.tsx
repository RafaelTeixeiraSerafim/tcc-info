import { Outlet } from "react-router-dom";
import ActionAlert from "../components/Alert";
import { useUserContext } from "../hooks";

export default function AppLayout() {
  const { alert, clearAlert } = useUserContext();

  return (
    <>
      {alert && (
        <ActionAlert
          message={alert.message}
          variant={alert.variant}
          severity={alert.severity}
          onClose={clearAlert}
        />
      )}
      <Outlet />
    </>
  );
}
