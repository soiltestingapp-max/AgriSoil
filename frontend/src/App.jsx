import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HomeLayout from "./HomeScreen/HomeLayout";
import Auth from "./Auth/Auth";
import Footer from "./Footer/Footer";
import AboutUs from "./HomeScreen/AboutUs/AboutUs";
import SoilTest from "./SoilTest/SoilTest";
import Analysis from "./Analysis/Analysis";
import Dashboard from "./admin/pages/Dashboard";
import Reports from "./admin/pages/Reports";
import AdminLayout from "./admin/AdminLayout";
import Users from "./admin/pages/Users";
import AddProduct from "./admin/pages/AddProduct";
import Orders from "./admin/pages/Orders";
import ProductsPage from "./ProductsPage/ProductsPage";
import ProductDetail from "./ProductsPage/ProductDetail";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import MyOrders from "./Orders/MyOrders";
import Wishlist from "./Wishlist/Wishlist";
// Admin Pages

export default function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  const hideLayout = isAdminRoute || isAuthRoute;

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/soil-test" element={<SoilTest />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>

      
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}
