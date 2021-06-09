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
        

        default: return state;
    }
};

export default reducer;
