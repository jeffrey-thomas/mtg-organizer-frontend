import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Card, db_api, Deck } from '../../database';
import { Firebase } from '../../firebase/Firebase';
import { RootState } from '../store';

interface CollectionState{
  status: 'uninitialized' | 'pending' | 'idle' | 'failed'
  decks:{[deck_id:string]:Deck}
  cards:{[card_id:string]:Card}
  library_id:string
}

const initialState:CollectionState ={
    decks: {},
    cards: {},
    library_id:'',
    status:'uninitialized'
};

//Load all
export const getCollection = createAsyncThunk(
  'collection/load',
  async () => {
    
    const token = await Firebase.getToken()
    
    let decks = await db_api.getDecks(token)
    let cards = await db_api.getCardsFromDecks(token, decks.map((deck)=>deck.id))
    
    let library_id = decks.find((deck)=>deck.name==='')!.id

    let deckCollection:{[deck_id:string]:Deck} = {}
    decks.forEach((deck)=>deckCollection[deck.id]=deck)

    let cardCollection:{[card_id:string]:Card}={}
    cards.forEach((card)=>cardCollection[`${card.deck_id}:${card.id}`]=card)

    return { decks:deckCollection, cards:cardCollection, library_id:library_id}
  }
);

export const CollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {

    addCard: (state, action:PayloadAction<Card>)=>{
      
      const {deck_id, id: card_id, qty} = action.payload
      const id = `${deck_id}:${card_id}`
      //If card is already in deck increase qty
      let card = state.cards[id]
      if(card)
        card.qty = qty
      else{
        state.cards={...state.cards, ...{[id]:action.payload} }
      }
    },

    updateCard: (state, action:PayloadAction<Card>)=>{
      const card = action.payload
      state.cards[`${card.deck_id}:${card.id}`] = card
    },
    
    removeCard: (state, action:PayloadAction<Card>)=>{
      const {deck_id, id} = action.payload
      delete state.cards[`${deck_id}:${id}`]
    },

    addDeck:(state, action:PayloadAction<Deck>)=>{
      state.decks[action.payload.id] = action.payload
    },

    updateDeck: (state, action:PayloadAction<Deck>)=>{
      state.decks[action.payload.id] = action.payload
    },

    removeDeck: (state, action:PayloadAction<Deck>)=>{
      //move cards
      Object.keys(state.cards).filter((card_id)=>state.cards[card_id].deck_id===action.payload.id).forEach(
        (card_id)=>{
          const card = state.cards[card_id]
          CollectionSlice.caseReducers.removeCard(state,{type:'removeCard', payload:card});
          //cehck if this crd is already in the library
          if(state.cards[`${state.library_id}:${card.id}`]){
            state.cards[`${state.library_id}:${card.id}`].qty += card.qty
          }
          else{
            card.deck_id = state.library_id
            CollectionSlice.caseReducers.addCard(state,{type:'addCard',payload:card})
          }
        }
      )
      delete state.decks[action.payload.id]
    }

  },
 
  //Async Thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
         state.status = 'pending'
      })

      .addCase(getCollection.fulfilled, (state, action) => {
        const {decks, cards, library_id} = action.payload
        state.status = 'idle';
        state.decks = decks
        state.cards = cards
        state.library_id = library_id
      })

      .addCase(getCollection.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

 export const { addCard, addDeck, updateCard, updateDeck, removeCard, removeDeck } = CollectionSlice.actions;

//Selectors
export const selectCollection = (state: RootState) => state.collection;
export const selectCollectionStatus = (state:RootState) => state.collection.status;

export const selectAvailableCards = (state:RootState)=>
  Object.keys(state.collection.cards)
    .filter((card_id)=>card_id.split(':')[0]===state.collection.library_id)
    .map((card_id)=>state.collection.cards[card_id]);

export const selectDecks = (state:RootState)=>
  Object.keys(state.collection.decks)
    .filter((deck_id)=>deck_id!==state.collection.library_id)
    .map((deck_id)=>state.collection.decks[deck_id])

export const selectDeckIds = (state:RootState)=> Object.keys(state.collection.decks)

//Reducer export
export const collectionReducer = CollectionSlice.reducer;