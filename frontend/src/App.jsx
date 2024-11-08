import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Suspense, useEffect, useState } from "react";
import Login from "./pages/User/Login";
import AppHome from "./pages/Dashboard/AppHome";
import SpinnerFullPage from "./components/Spinner";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppHome />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" />
            <Route path="mycourse" />
            <Route path="user-setting" />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
