import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/index";


function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
    </Routes>
  );
}

export default App;
