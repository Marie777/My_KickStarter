import axios from 'axios';

export const FETCH_PROJECTS = 'fetch_projects';
export const FETCH_PROJECT = 'fetch_project';

export function fetchProjects() {
  const URL = 'http://localhost:3001/project/';
  const request = axios.get(URL);
  return {
    type: FETCH_PROJECTS,
    payload: request
  }
}

export function fetchProject(_id) {
  const URL = `http://localhost:3001/project/${_id}`;
  console.log(URL);
  const request = axios.get(URL);
  return {
    type: FETCH_PROJECT,
    payload: request
  }
}





///------------------------------------------
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
