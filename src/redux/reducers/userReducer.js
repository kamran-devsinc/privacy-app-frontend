import { INITIAL_STATE }  from "./initialState";
import * as actionTypes from 'redux/actions/actionTypes'

const reducer = (state = INITIAL_STATE.user, action) => {
    const { payload } = action

    switch (action.type) {

        default: return state;
    }
};

export default reducer;
