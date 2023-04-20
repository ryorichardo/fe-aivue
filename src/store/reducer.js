import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import globalReducer from './globalReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    global: globalReducer
});

export default reducer;
