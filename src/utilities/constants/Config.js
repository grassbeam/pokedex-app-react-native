



export const IS_DEBUG = process.env.NODE_ENV === 'development';

export const _ENCRYPT = "IM2FBXDPqNE3LXPzFlqo";

export const STOR_KEY = {
    RootAllStorage: IS_DEBUG? "pisanggStorage": "_psgg",
  }


export const BASE_API = "https://pokeapi.co/api/";
export const API_VERSION = 'v2';