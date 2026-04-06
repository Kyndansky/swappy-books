import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/index";
import AuthenticatePage from "./pages/auth";
import Messages from "./pages/messages";
import NotFound from "./pages/404";
import SwapsListPage from "./pages/swapsListPage";
import BookPage from "./pages/book";  // <-- AGGIUNGI QUESTO IMPORT
import { fetchFavoriteSwaps, fetchPersonalSwaps, fetchShopSwaps } from "./misc/api";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<AuthenticatePage authType="login"/>} path="/login"/>
      <Route element={<AuthenticatePage authType="register"/>} path="/register"/>
      <Route element={<Messages/>} path="/messages"/>
      <Route path="/swaps" element={<SwapsListPage retrieveSwapsFunction={fetchPersonalSwaps} swapsCollection="Personal"/>}/>
      <Route path="/shop" element={<SwapsListPage retrieveSwapsFunction={fetchShopSwaps} swapsCollection="Shop"/>}/>
      <Route path="/favorites" element={<SwapsListPage retrieveSwapsFunction={fetchFavoriteSwaps} swapsCollection="Favorite"/>}/> 
      <Route path="/book/:id" element={<BookPage />} />
      
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

export default App;
