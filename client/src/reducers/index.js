import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProjectsReducer from './reducer_projects';
import UserReducer from './reducer_user';



const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  projects : ProjectsReducer,
    user : UserReducer,
});

export default rootReducer;
