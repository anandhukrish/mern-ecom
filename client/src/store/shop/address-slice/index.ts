import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Address = {
  userId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
  _id: string;
};

type AddressState = {
  isLoading: boolean;
  addressList: Address[];
};

const initialState: AddressState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData: Omit<Address, "_id">) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      formData
    );

    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({
    userId,
    addressId,
    formData,
  }: {
    userId: string;
    addressId: string;
    formData: Omit<Address, "_id" | "userId">;
  }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({
    userId,
    addressId,
  }: {
    userId: string | undefined;
    addressId: string;
  }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
