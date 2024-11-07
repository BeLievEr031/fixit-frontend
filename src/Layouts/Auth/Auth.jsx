import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/user-store";

function Auth() {
  const { user } = useAuthStore();

  if (user === null) {
    return <Navigate to="/auth/signup" replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Auth;
