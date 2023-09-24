import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IJerry {
    City: string;
    ID: string;
    Latitude: number;
    Longitude: number;
    name: string;
}

export interface CounterState {
    jerry: IJerry | null;
}

const initialState: CounterState = {
  jerry: {
    City: 'Almaty',
    ID: 'jerry1',
    Latitude: 43.261067,
    Longitude: 76.930945,
    name: 'Jerry Arbat',
  },
};

export const jerrySlice = createSlice({
  name: 'jerry',
  initialState,
  reducers: {
    setJerry: (state, action: PayloadAction<IJerry>) => {
      state.jerry = action.payload;
    },
  },
});

export const { setJerry } = jerrySlice.actions;

export default jerrySlice.reducer;
