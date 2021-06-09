import { USER_INITIAL_STATE as INITIAL_STATE }  from "./initialState";
import * as actionTypes from 'redux/actions/actionTypes'

const reducer = (state = INITIAL_STATE, action) => {
    const { payload } = action

    switch (action.type) {
        case 'PENDING':
           return {
             ...state, loading: true,
           };

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
