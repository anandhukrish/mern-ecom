import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import productReducer from "../store/admin/product.slice";

import adminOrderSlice from "./admin/order.slice";

import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common/common.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    product: productReducer,
    adminOrder: adminOrderSlice,

    shopProduct: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    commonFeature: commonFeatureSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
