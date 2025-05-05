import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDomainsFromServer = createAsyncThunk(
  "Domains/getDomainsFromServer",
  async (url) => {
    return fetch(url).then(res => res.json()).then(data => {
      console.log(data);
    })
  }
);

const slice = createSlice({
  name: "Domains",
  initialState: [],
  reducers: {
    addDomainAction: (state, action) => {
      axios
        .post(
          "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
          {
            domain: action.payload.domain,
            isActive: true,
            createdDate: 123445667,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
    removeDomainAction: (state, action) => {
      axios
        .delete(
          `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${action.payload.id}`
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDomainsFromServer.fulfilled, (state, action) => {
      console.log('state', state);
      console.log('action', action)
    })
  }
});

export const { addDomainAction, removeDomainAction } = slice.actions;
export default slice.reducer;
