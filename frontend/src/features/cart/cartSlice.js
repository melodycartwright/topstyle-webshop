import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const cartId = product.cartId || product._id; // Use cartId if available, fallback to _id

      const existingItem = state.items.find((item) => item.cartId === cartId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          cartId,
          product,
          quantity: 1,
          selectedSize: product.selectedSize || null,
        });
      }
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.items = state.items.filter((item) => item.cartId !== cartId);
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;
      const item = state.items.find((item) => item.cartId === cartId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.cartId !== cartId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
