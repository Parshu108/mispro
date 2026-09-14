import { createSlice } from "@reduxjs/toolkit";
const wishlistSlice = createSlice({
  name: "mywishlistname",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addtowishlist: (state, actions) => {
      const mydata = state.wishlist.filter(
        (key) => key.id == actions.payload.id,
      );
      if (mydata.length >= 1) {
        alert("Product already in wishlist");
      } else {
        state.wishlist.push({ ...actions.payload });
      }
    },
    removefromwishlist: (state, actions) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id != actions.payload.id,
      );
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});
export const { addtowishlist, removefromwishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
