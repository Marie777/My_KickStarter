// import _ from 'lodash';
import {  FETCH_USER } from '../actions';


export default function(state={}, action) {
    // debugger;
    switch(action.type){
        case FETCH_USER:
            return {...state, [action.payload.data.user._id] : action.payload.data.user}
        default:
            return state;
    }
}
