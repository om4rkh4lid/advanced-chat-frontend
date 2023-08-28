import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { userConnected, userDisconnected } from "../features/chat/ChatSlice";

export const ProtectedRoute: React.FC = () => {

  const authenticatedUser = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticatedUser.user) {
      navigate('/login', { replace: true, state: { redirected: true }});
    }
  }, [authenticatedUser])

  return <Outlet />;
}