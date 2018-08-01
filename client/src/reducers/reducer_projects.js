import _ from 'lodash';
import {  FETCH_PROJECTS, FETCH_PROJECT, DELETE_PROJECT } from '../actions';


export default function(state={}, action) {
  // debugger;
  switch(action.type){
    case DELETE_PROJECT:
      return _.omit(state, action.payload);
    case FETCH_PROJECT:
      return {...state, [action.payload.data._id] : action.payload.data}
    case FETCH_PROJECTS:
    console.log(action.payload.data);
      // return action.payload.data;
      return _.mapKeys(action.payload.data, '_id');
    default:
      return state;
  }
}
