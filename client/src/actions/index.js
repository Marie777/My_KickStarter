import axios from 'axios'

export const RECIEVE_ITEMS = 'RECIEVE_ITEMS'
export const LOADING_ITEMS = 'LOADING_ITEMS'

function receiveItems(data, name) {
  return {
    type: RECIEVE_ITEMS,
    data,
    name
  }
}

function loadingItems(name) {
  return {
    type: LOADING_ITEMS,
    name
  }
}

export function fetchItems(listName, startIndex, endIndex) {
  const URL = 'http://localhost:3001/';
  const request = axios.get(`${URL}${listName}?_start=${startIndex}&_end=${endIndex}`);
  console.log("request --- >" + request);
  return dispatch => {
    dispatch(loadingItems(listName))
    return request.then(response => dispatch(receiveItems(response.data, listName)))
  }
}
