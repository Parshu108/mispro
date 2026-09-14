import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import wishlistReducer from "./wishlistslice";

const store=configureStore({
   reducer:{
      mycart:cartReducer,
      mywishlist:wishlistReducer
   } 
})
export default store;