import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProjectsReducer from './reducer_projects';



const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  projects : ProjectsReducer,
});

export default rootReducer;
