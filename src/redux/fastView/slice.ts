import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FastViewSliceState, Product } from './types';

const initialState: FastViewSliceState = {
    successFastViewModal: false,
    product: null, 
  };
  
const fastViewSlice = createSlice({
  name: 'fastView',
  initialState,
  reducers: {
    openFastViewModal(state, action: PayloadAction<Product>) {
      state.successFastViewModal = true; 
      state.product = action.payload; 
    },
    closeFastViewModal(state) {
      state.successFastViewModal = false; 
      state.product = null; 
    },
  },
});

export const { openFastViewModal, closeFastViewModal } = fastViewSlice.actions;

export default fastViewSlice.reducer;
