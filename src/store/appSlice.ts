import {createSlice} from "@reduxjs/toolkit";
import { TAppState, TCardsItem } from '../types/types';

const initialState: TAppState = {
  cards: [],
  language: 'en',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCardsList(state, { payload }: { payload: TCardsItem[] }) {
      state.cards = payload;
    },

    addCardToList(state, { payload: { number, owner, expiry } }: { payload: TCardsItem }) {
      state.cards.push({
        number,
        owner,
        expiry,
        id: state.cards.length + 1,
      })
    },

    blockCard(state, { payload: { id } }: { payload: { id: number } }) {
      const cardIndex = state.cards.findIndex(item => item.id === id);
      state.cards[cardIndex].blocked = !state.cards[cardIndex].blocked;
    },

    setLanguage(state, { payload: { value } }: { payload: { value: string } }) {
      state.language = value;
    },
  },
});

export const {
  setCardsList,
  addCardToList,
  blockCard,
  setLanguage,
} = appSlice.actions;

export default appSlice.reducer;
