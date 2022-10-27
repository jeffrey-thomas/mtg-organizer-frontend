import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardDataReducer } from './CardDataSlice';
import { collectionReducer } from './CollectionSlice';
import { selectionReducer } from './SelectionSlice';

export const store = configureStore({
  reducer: {
    cardData: cardDataReducer,
    collection:collectionReducer,
    selection:selectionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
