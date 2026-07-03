import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout";
import Matters from "./pages/Matters";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Showroom from "./pages/showroom";
import Login from "./pages/login";
import Productdisplay from "./pages/Product";
import Blog from "./pages/Blog";
import Cartdata from "./pages/cartdata";
import Checkout from "./pages/checkout";
import OrderComplete from "./pages/ordercomplete";
import Productdisplays from "./pages/showroom";
import AdminLayout from "./Dashboard/Admin/AdminLayout";
import Dashboard from "./Dashboard/Admin/Pages/Dashboard";
import Products from "./Dashboard/Admin/Pages/Product";
import WishlistPage from "./pages/wishlist";
const app=()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Matters />} />
            <Route path="matter" element={<Matters />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product" element={<Product />} />
            <Route path="showroom" element={<Showroom />} />
            <Route path="wishlist" element={<WishlistPage/>}/>
            <Route path="productdisplay/:id" element={<Productdisplay />} />
            <Route path="cartdata" element={<Cartdata />} />
            <Route path="ordercomplete" element={<OrderComplete />} />
            <Route path="login" element={<Login />} />
            <Route path="blog" element={<Blog />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="productdisplays/:id" element={<Productdisplays />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default app;
