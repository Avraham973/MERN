/** @format */

import { SET_ALERT, REMOVE_ALERT } from "../Action/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

//State is the current state
//Payload is data that need to add to the state
