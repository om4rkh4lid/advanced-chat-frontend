import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useEffect } from "react"

export const ProtectedRoute: React.FC = () => {

  const authenticatedUser = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticatedUser.user) {
      navigate('/login', { replace: true, state: { redirected: true }});
    }
  }, [authenticatedUser])

  return <Outlet />;
}