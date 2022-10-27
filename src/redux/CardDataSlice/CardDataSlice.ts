import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { scryfall_api } from '../../scryfall/Api';
import { MtgCardData } from '../../components/Mtg/MtgCards';
import { RootState } from '../store';


interface CardDataState{
  status: 'uninitialized' | 'pending' | 'idle' | 'failed'
  cards:{
    [id:string]:MtgCardData
  }
}

const initialState: CardDataState = {
  cards: {},
  status:'uninitialized'
};

//Load all
export const loadCards = createAsyncThunk(
  'cards/load',
  async (ids:string[]) => {
    let response = await scryfall_api.getByIds(ids);
    return response;
  }
);

export const CardDataSlice = createSlice({
  name: 'CardData',
  initialState,
  reducers: {

    addCard: (state, action:PayloadAction<MtgCardData>)=>{
      state.cards[action.payload.id] = action.payload
    },

    releaseCard: (state, action:PayloadAction<string>)=>{
      delete state.cards[action.payload]
    },

    clear: (state)=>{
      state.cards = {}
    }
  },
 
  //Async Thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(loadCards.pending, (state) => {
         state.status = 'pending'
      })
      .addCase(loadCards.fulfilled, (state, action) => {
        state.status = 'idle';
        action.payload?.forEach(
          (card)=>{
            state.cards[card.id]=card
          }
        )
      })
      .addCase(loadCards.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

 export const { addCard, releaseCard, clear } = CardDataSlice.actions;

//Selectors
export const selectCards = (state: RootState) => state.cardData.cards;
export const selectCard = (id:string)=> (state:RootState)=>state.cardData.cards[id];
export const selectCardDataStatus = (state:RootState) => state.cardData.status;

//Reducer export
export const cardDataReducer = CardDataSlice.reducer;