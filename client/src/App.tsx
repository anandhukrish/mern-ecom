import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/admin/dashboard";
import Products from "./pages/admin/products";
import Orders from "./pages/admin/orders";
import Features from "./pages/admin/features";
import AuthLayout from "./components/auth/layout";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shop/home";
import ShopListing from "./pages/shop/listing";
import Checkout from "./pages/shop/checkout";
import ShopAccount from "./pages/shop/account";
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice";
import CheckAuth from "./components/common/check-auth";
import { Skeleton } from "./components/ui/skeleton";
import AdminLayout from "./components/admin/layout";
import { RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import SearchProducts from "./pages/shop/search";

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      />
      <Route
        path="auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route
        path="admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="features" element={<Features />} />
      </Route>
      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShopListing />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account" element={<ShopAccount />} />
        <Route path="search" element={<SearchProducts />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/unauth-page" element={<NotFound />} />
    </Routes>
  );
}

export default App;
