import * as ActionTypes from './ActionTypes';
import { View } from 'react-native'

export const comments = (state = { 

    errMess: null, 
    comments:[]
}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
        return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
        return {...state, errMess: action.payload};

        default:
        return state;
  }
};
