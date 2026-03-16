import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/index";
import AuthenticatePage from "./pages/auth";
import Messages from "./pages/messages";
import NotFound from "./pages/404";
import SwapsListPage from "./components/swapsListPage";
import { getPersonalSwaps, getShopSwaps } from "./misc/api";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<AuthenticatePage authType="login"/>} path="/login"/>
      <Route element={<AuthenticatePage authType="register"/>} path="/register"/>
      <Route element={<Messages/>} path="/messages"/>
      <Route path="/swaps" element={<SwapsListPage retrieveSwapsFunction={getPersonalSwaps} swapsCollection="Personal"/>}/>
      <Route path="/shop" element={<SwapsListPage retrieveSwapsFunction={getShopSwaps} swapsCollection="Shop"/>}/>
      <Route path="*" element={<NotFound />}/>
      {/* <Route element={<Book />} path="/book" /> */}
    </Routes>
  );
}

export default App;
