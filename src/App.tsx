import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="" element={<LoginPage></LoginPage>}></Route>
          <Route path="chat" element={<ChatPage></ChatPage>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
