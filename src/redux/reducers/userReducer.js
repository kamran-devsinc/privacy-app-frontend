import { INITIAL_STATE }  from "./initialState";
import * as actionTypes from 'redux/actions/actionTypes'

const reducer = (state = INITIAL_STATE.user, action) => {
    const { payload } = action

    switch (action.type) {
        case actionTypes.FETCH_ALL_USERS: {
          return {
            ...state,
            all: payload,
          }
        }

        case actionTypes.SET_USER_PROFILE: {
          return {
            ...state,
            profile: payload,
          }
        }

        case actionTypes.SET_MESSAGES: {
          return {
            ...state,
            messages: payload,
          }
        }

        default: return state;
    }
};

export default reducer;
