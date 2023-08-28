import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../features/auth/AuthSlice";
import { useEffect } from "react";

export const Redirect: React.FC = () => {
  const authenticatedUser = getAuthenticatedUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authenticatedUser) {
      navigate('/chat');
    } else if (pathname !== '/signup') {
      navigate('/login')
    }
  }, [authenticatedUser])

  return <Outlet />
}