export interface EncodeMessagePayload {
  decodedMessage: string;
  password: string;
}

export interface DecodeMessagePayload {
  encodedMessage: string;
  password: string;
}

export interface EncodedMessageApi {
  encoded: string;
}

export interface DecodedMessageApi {
  decoded: string;
}