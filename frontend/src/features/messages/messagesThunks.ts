import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { DecodedMessageApi, DecodeMessagePayload, EncodedMessageApi, EncodeMessagePayload } from '../../../types';

export const encodeMessage = createAsyncThunk<EncodedMessageApi, EncodeMessagePayload>(
  'messages/encodeMessage',
  async (message) => {
    const response = await axiosApi.post<EncodedMessageApi>('/encode', message);

    return response.data;
  }
);

export const decodeMessage = createAsyncThunk<DecodedMessageApi, DecodeMessagePayload>(
  'messages/decodeMessage',
  async (message) => {
    const response = await axiosApi.post<DecodedMessageApi>('/decode', message);

    return response.data;
  }
);