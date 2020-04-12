/** @format */
import { SET_ALERT, REMOVE_ALERT } from "../Action/types";

const initailState = [{}];

export default function (state = initailState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
//State is the current state
//Payload is data that need to add to the state
