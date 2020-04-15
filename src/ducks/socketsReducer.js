import Axios from "axios";

const initialState = {
    socket:'testytest'
}
const ROOM = 'ROOM';

export function joinRoomTTT(){
    return{
        type:ROOM,
        payload:Axios.get('/api/createroom',)
    }
        
}

export default function reducer(state=initialState, action){
    if (!state) {return state = initialState}
    if (!action) {return state}

    const {type,payload} = action

    switch(type) {
        case ROOM + '_PENDING':
            return {...state, loading: true, error: false}
        case ROOM + '_FULFILLED':
            return {...state, loading: false, socket:payload.socket }
        case ROOM + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        default:
            return {...state};
    }
}