export const USER_INITIAL_STATE = {
    user: {
        email: '',
        name: '',
        connections: [],
        profile: {},
        messages: [],
        workExperience: {}
    },
}

const INITIAL_STATE = {
    ...USER_INITIAL_STATE
}

export default INITIAL_STATE