import io from 'socket.io-client'
let socket = io('localhost:4420')

const initialState = {
    socketInfo: [0,1,2,3]
}
const TEST = 'TEST';

export function test() {
    let action = {
        type:TEST,
        payload:initialState.socketInfo
    }
    return action
}

export default function reducer(state=initialState, action){
    if (!state) {return state = initialState}
    if (!action) {return state}

    const {type,payload} = action

    switch(type) {
        case TEST + '_PENDING':
            console.log('hit')
            return {...state, loading: true, error: false}
        case TEST + '_FULFILLED':
            console.log(payload)
            return {...state, loading: false, socketInfo: payload.data }
        case TEST + '_REJECTED':
            console.log('hit')
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        default:
            return {...state};
    }
}