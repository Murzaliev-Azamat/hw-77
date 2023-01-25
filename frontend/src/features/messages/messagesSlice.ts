import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DecodedMessageApi, EncodedMessageApi } from '../../../types';
import {RootState} from "../../app/store";
import { decodeMessage, encodeMessage } from './messagesThunks';


interface MessagesState {
  decodedMessage: string;
  encodedMessage: string;
  password: string;
  encodeLoading: boolean;
  decodeLoading: boolean;
}

const initialState: MessagesState = {
  decodedMessage: '',
  encodedMessage: '',
  password: '',
  encodeLoading: false,
  decodeLoading: false,
}

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(encodeMessage.pending, (state) => {
      state.encodeLoading = true;
    });
    builder.addCase(encodeMessage.fulfilled, (state, action: PayloadAction<EncodedMessageApi>) => {
      state.encodeLoading = false;
      state.encodedMessage = action.payload.encoded;
      state.decodedMessage = '';
    });
    builder.addCase(encodeMessage.rejected, (state) => {
      state.encodeLoading = false;
    });
    builder.addCase(decodeMessage.pending, (state) => {
      state.decodeLoading = true;
    });
    builder.addCase(decodeMessage.fulfilled, (state, action: PayloadAction<DecodedMessageApi>) => {
      state.decodeLoading = false;
      state.decodedMessage = action.payload.decoded;
      state.encodedMessage = '';
    });
    builder.addCase(decodeMessage.rejected, (state) => {
      state.decodeLoading = false;
    });
  }});

export const messagesReducer = MessagesSlice.reducer;
export const selectDecodedMessage = (state: RootState) => state.messages.decodedMessage;
export const selectEncodedMessage = (state: RootState) => state.messages.encodedMessage;