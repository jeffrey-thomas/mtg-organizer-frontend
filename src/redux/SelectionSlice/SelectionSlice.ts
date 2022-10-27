import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';


interface SelectionState{
  deck:string
}

const initialState: SelectionState = {
  deck:''
};

export const SelectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {

    setCurrentDeck: (state, action:PayloadAction<string>)=>{
      state.deck = action.payload
    },
  },
 
});

 export const { setCurrentDeck, } = SelectionSlice.actions;

//Selectors
export const selectCurrentDeck = (state: RootState) => state.selection.deck;
 

//Reducer export
export const selectionReducer = SelectionSlice.reducer;