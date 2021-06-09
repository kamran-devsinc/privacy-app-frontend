import { INITIAL_STATE }  from "./initialState";
import * as actionTypes from 'redux/actions/actionTypes'

const reducer = (state = INITIAL_STATE.auth, action) => {
    const { payload } = action

    switch (action.type) {
        case actionTypes.SET_CURRENT_USER: {
          return {
            ...state.user,
            ...payload,
            isAuthenticated: true,
          }
        }

        default: return state;
    }
};

export default reducer;
