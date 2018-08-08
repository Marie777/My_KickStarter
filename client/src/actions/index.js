import axios from 'axios';

export const FETCH_PROJECTS = 'fetch_projects';
export const FETCH_PROJECT = 'fetch_project';
export const DELETE_PROJECT = 'delete_project';
export const DELETE_DONATION = 'delete_donation';



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
  const request = axios.get(URL);
  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

export function deleteProject(_id, callback) {
  const URL = `http://localhost:3001/project/delete/${_id}`;
  axios.delete(URL).then(() => callback());

  return {
    type: DELETE_PROJECT,
    payload: _id
  }
}


export function deleteDonation(_id, donationAmount, callback) {
  const URL = `http://localhost:3001/project/deletedonation/${_id}/${donationAmount}`;
  axios.get(URL).then(() => callback());

  return {
    type: DELETE_DONATION,
    payload: _id
  }
}
