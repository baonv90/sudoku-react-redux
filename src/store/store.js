import { createStore } from 'redux';
import sudokuReducers from '../reducers/sudokuReducers';

const store = createStore(sudokuReducers);

export default store;

