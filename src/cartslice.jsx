import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "myname",
  initialState: {
    cart: [],
  },
  reducers: {
    addtocard: (state, actions) => {
      const mydata = state.cart.filter((key) => key.id == actions.payload.id);
      if (mydata.length >= 1) {
        alert("product Added sucessfully");
      } else {
        state.cart.push({ ...actions.payload, qnty: 1 });
      }
    },
    qntIncrese: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          state.cart[i].qnty++;
        }
      }
    },
    qntydecrease: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          if (state.cart[i].qnty <= 1) {
            alert("Quantity not less than 1 ");
          } else {
            state.cart[i].qnty--;
          }
        }
      }
    },
    dataRemove: (state, actions) => {
      state.cart = state.cart.filter((item) => item.id != actions.payload.id);
    },
    removeCart: (state) => {
      state.cart = [];
    },
    customber: (state) => {
      state.cart = [];
    },
    addtocards: (state, actions) => {
      const mydata = state.cart.filter((key) => key.id == actions.payload.id);
      if (mydata.length >= 1) {
        alert("product Added sucessfully");
      } else {
        state.cart.push({ ...actions.payload, qnty: 1 });
      }
    },
  },
});
export const{addtocard,qntIncrese,qntydecrease,dataRemove,removeCart,customber,addtocards}=cartSlice.actions;
export default cartSlice.reducer;
