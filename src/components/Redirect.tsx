import { Outlet, useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../features/auth/AuthSlice";
import { useEffect } from "react";

export const Redirect: React.FC = () => {
  const authenticatedUser = getAuthenticatedUser();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(authenticatedUser ? '/chat' : '/login');
  }, [authenticatedUser])

  return <Outlet />
}