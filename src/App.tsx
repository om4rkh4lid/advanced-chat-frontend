import React, { useEffect } from "react"
import { Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAppSelector } from "./hooks/useAppSelector";

const Redirect: React.FC = () => {
  const authenticatedUser = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(authenticatedUser ? '/chat' : '/login');
  }, [authenticatedUser])

  return <Outlet />
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />}>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="chat" element={<ChatPage></ChatPage>}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
