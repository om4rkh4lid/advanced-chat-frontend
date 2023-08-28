import React from "react"
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { Redirect } from "./components/Redirect";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SignupPage } from "./pages/SignupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />}>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route path="signup" element={<SignupPage></SignupPage>}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="chat" element={<ChatPage></ChatPage>}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
