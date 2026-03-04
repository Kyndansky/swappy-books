import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/index";
import AuthenticatePage from "./pages/auth";
import Messages from "./pages/messages";


function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<AuthenticatePage authType="login"/>} path="/login"/>
      <Route element={<AuthenticatePage authType="register"/>} path="/register"/>
      <Route element={<Messages/>} path="/messages"/>
    </Routes>
  );
}

export default App;
