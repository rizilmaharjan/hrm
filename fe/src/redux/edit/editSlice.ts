import { createSlice } from "@reduxjs/toolkit";

type TDataToEdit = {
  serviceToEdit: any;
  editID: string;
  isEdit: boolean;
};

const initialState: TDataToEdit = {
  serviceToEdit: null,
  editID: "",
  isEdit: false,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setServiceToEdit(state, action) {
      state.serviceToEdit = action.payload;
    },
    setEditID(state, action) {
      state.editID = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const { setServiceToEdit, setEditID, setIsEdit } = editSlice.actions;
export default editSlice.reducer;
