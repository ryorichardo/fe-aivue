import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import globalReducer from './globalReducer';
import candidateReducer from './candidateReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    global: globalReducer,
    candidate: candidateReducer
});

export default reducer;
