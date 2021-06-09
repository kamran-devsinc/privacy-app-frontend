import { USER_INITIAL_STATE as INITIAL_STATE }  from "./initialState";


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PENDING':
           return {
             ...state, loading: true,
           };

        default: return state;
    }
};

export default reducer;
