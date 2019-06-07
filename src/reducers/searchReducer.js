import _ from 'lodash';
import {
    SEARCH
} from '../actions/types';





export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH:
            return { ...state,   ..._.mapKeys(action.payload, '_id') };
        // return { ...state, ...action.payload };

        default:
            return state;
    }
};
