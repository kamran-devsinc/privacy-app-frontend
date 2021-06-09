export const INITIAL_STATE = {
    auth: {
        email: {
            value: '',
            hidden: false,
        },
        name: '',
        connections: {
            value: [],
            hidden: false,
        },
        workExperience: {
            value: '',
            hidden: false,
        },
        isAuthenticated: false,
    },
    user: {
        all: [],
        profile: {},
        messages: [],
    },
}

export default INITIAL_STATE
