export const USER_INITIAL_STATE = {
    user: {
        email: {
            value: '',
            hidden: false,
        },
        name: '',
        connections: {
            value: [],
            hidden: false,
        },
        profile: {},
        messages: [],
        workExperience: {
            value: '',
            hidden: false,
        },
        isAuthenticated: false,
    },
}

const INITIAL_STATE = {
    ...USER_INITIAL_STATE
}

export default INITIAL_STATE
