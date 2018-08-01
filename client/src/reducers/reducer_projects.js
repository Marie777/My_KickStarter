import {  FETCH_PROJECTS, FETCH_PROJECT } from '../actions';
import _ from 'lodash';

export default function(state={}, action) {
  // debugger;
  switch(action.type){
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
