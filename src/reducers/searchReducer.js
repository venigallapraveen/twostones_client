import _ from 'lodash';
import {
    SEARCH, CLEAR_ITEMS
} from '../actions/types';


const state_reset = {};


export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH:
            return { ...state,   ..._.mapKeys(action.payload, '_id') };

        case CLEAR_ITEMS:
            return state_reset ;


        default:
            return state;
    }
};
