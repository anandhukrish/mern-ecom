import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Review = {
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
};

type ReviewState = {
  isLoading: boolean;
  reviews: Review[];
};
const initialState: ReviewState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata: Review) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/review/add`,
      formdata
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/review/${id}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
