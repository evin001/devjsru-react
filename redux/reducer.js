import { combineReducers } from 'redux';
import tvMazeReducer, { moduleName as tvMazeModule } from '../ducks/tvmaze';

export default combineReducers({
    [tvMazeModule]: tvMazeReducer,
});
