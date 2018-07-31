import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {  RECIEVE_ITEMS, LOADING_ITEMS } from '../actions';
import ProjectsReducer from './reducer_projects';

export const PAGE_SIZE = 1;

function itemsReducer(state = {}, action) {
  switch (action.type) {
    case RECIEVE_ITEMS:
      const currentData = state[action.name].data || [];
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          loading: false,
          data: [...currentData, ...action.data],
          hasAll: action.data.length < PAGE_SIZE
        }
      }
    case LOADING_ITEMS: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          loading: true
        }
      }
    }
    default:
      return state
  }
}





const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  projects : ProjectsReducer,
  itemsReducer
});

export default rootReducer;
