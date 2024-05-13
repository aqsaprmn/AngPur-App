import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { UseRefreshTokenQueryV2 } from "./Services/AuthV2Api";
import MainLayout from "./components/Layout/MainLayout";
import GuestLayout from "./components/Guest/GuestLayout";
import PageNotFound from "./pages/ErrHandling.tsx/PageNotFound";
import { defaultRoleV2 } from "./utils/constants/routeData";
import MainPage from "./pages/Client/Main/Main";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import LoginClientPage from "./pages/Client/Login/LoginClientPage";
import RegisterPage from "./pages/Client/Login/RegisterPage";
import ShippingPage from "./pages/Client/Shipping/Shipping";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    defaultRoleV2.routes
      .filter((e) => {
        return e.isHidden == false;
      })
      .map((e) => {
        return {
          ...e,
          children: e.children.filter((e) => {
            return e.isHidden == false;
          }),
        };
      });

    setInterval(async () => {
      if ("token" in Cookies.get()) {
        await UseRefreshTokenQueryV2();
      }
    }, Number(import.meta.env.VITE_REFRESH_INTERVAL));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* CLIENT */}
          <Route element={<GuestLayout />}>
            <Route path="/">
              <Route path="/" element={<MainPage />} />
            </Route>

            <Route path="/shipping">
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/shipping/create" element={<ShippingPage />} />
              <Route path="/shipping/edit" element={<ShippingPage />} />
            </Route>

            <Route path="/order">
              <Route path="/order" element={<MainPage />} />
              <Route path="/order/detail/:uuid" element={<MainPage />} />
            </Route>

            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<LoginClientPage />} />
            </Route>

            <Route path="/register" element={<PublicRoute />}>
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* END CLIENT */}
          </Route>

          {/* ADMIN */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="/admin" element={<MainPage />} />

            <Route element={<MainLayout />}>
              {/* Order */}
              <Route path="/admin/order">
                {/* GENERAL PAGE*/}
                <Route path="/admin/order" element={<MainPage />} />
                <Route path="/admin/order/create" element={<MainPage />} />
                <Route path="/admin/order/edit" element={<MainPage />} />
              </Route>

              {/* Product */}
              <Route path="/admin/product">
                {/* GENERAL PAGE*/}
                <Route path="/admin/product" element={<MainPage />} />
                <Route path="/admin/product/create" element={<MainPage />} />
                <Route path="/admin/product/edit" element={<MainPage />} />
              </Route>

              {/* User */}
              <Route path="/admin/user">
                {/* GENERAL PAGE*/}
                <Route path="/admin/user" element={<MainPage />} />
                <Route path="/admin/user/create" element={<MainPage />} />
                <Route path="/admin/user/edit" element={<MainPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
