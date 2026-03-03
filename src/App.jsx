import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout";
import Matters from "./pages/Matters";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Pillow from "./pages/pillow";
import Showroom from "./pages/showroom";
import Login from "./pages/login";
import Productdisplay from "./pages/Product";
import Blog from "./pages/Blog";
import Cartdata from "./pages/cartdata";
import Checkout from "./pages/checkout";
import OrderComplete from "./pages/ordercomplete";
import Productdisplays from "./pages/showroom";






const app=()=>{
  return(
  <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Matters/>}/>
        <Route path="matter" element={<Matters/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pillow" element={<Pillow/>}/>
        <Route path="showroom" element={<Showroom/>}/>        
        <Route path="productdisplay/:id" element={<Productdisplay/>}/>
        <Route path="cartdata" element={<Cartdata/>}/> 
         <Route path="ordercomplete" element={<OrderComplete/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="blog" element={<Blog/>}/>
        <Route path="checkout" element={<Checkout/>}  />
        <Route path="productdisplays/:id" element={<Productdisplays/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}
export default app;
