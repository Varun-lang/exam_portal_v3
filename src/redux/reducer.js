import initialState from "./initialState";
import { combineReducers } from "redux";

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  quizes: quizReducer,
});
