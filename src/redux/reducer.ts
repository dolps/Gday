const defaultState = {
    user: {}
};

export default function reducer(state = {}, {type, payload}: { type: string, payload: any }): any {
    switch (type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                user: {
                    username: payload
                }
            }
    }

    return state;
}
