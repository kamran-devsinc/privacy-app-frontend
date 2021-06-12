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
        isAuthenticated: localStorage.getItem('AUTH_TOKEN') ? true : false,
    },
    user: {
        all: [],
        profile: null,
        messages: [],
    },
}

export default INITIAL_STATE
