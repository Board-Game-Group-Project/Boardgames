import axios from 'axios'

const initialState = {
    player: {},
    loading: false,
    error: false,
    errorMessage: ''
}

const CHECK_PLAYER = "CHECK_PLAYER"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const REGISTER = "REGISTER"
const CLEAR_REDUCER = "CLEAR_REDUCER"
const DELETE_PLAYER = "DELETE_PLAYER"
const EDIT_PLAYER = "EDIT_PLAYER"

export function clearReducer() {
    let action = {
        type: CLEAR_REDUCER
    }

    return action
}

export function checkPlayer() {
    let action = {
        type: CHECK_PLAYER,
        payload: axios.get('/api/check')
    }

    return action
}

export function register(username, email, password) {
    let action = {
        type: REGISTER,
        payload: axios.post(`/api/auth/register`, {username, email, password})
    }

    return action
}

export function login(username, password) {
    let action = {
        type: LOGIN,
        payload: axios.post(`/api/auth/login`, {username, password})
    }
    return action
}

export function logout() {
    let action = {
        type: LOGOUT,
        payload: axios.post('/api/auth/logout')
    }    

    return action
}

export function editPlayer(player_id, username, email) {
    let action = {
        type: EDIT_PLAYER,
        payload: axios.put(`/api/auth/edit/${player_id}`, {username, email})
    }    
    
    return action
}

export function deletePlayer(player_id, username, password) {
    let action = {
        type: DELETE_PLAYER,
        payload: axios.delete(`/api/auth/delete/${player_id}`, {data: {username, password}})
    }

    return action
}

export default function playerReducer(state, action) {
    if (!state) {return state = initialState}
    if (!action) {return state}
    
    switch(action.type) {
        case CHECK_PLAYER + '_PENDING':
            return {...state, loading: true, error: false}
        case CHECK_PLAYER + '_FULFILLED':
            return {...state, loading: false, player: action.payload.data}
        case CHECK_PLAYER + '_REJECTED':
            console.log('CHECK_PLAYER REJECTED')
            return {...state, loading: false}
        case LOGIN + '_PENDING':
            return {...state, loading: true, error: false}
        case LOGIN + '_FULFILLED':
            return {...state, loading: false, player: action.payload.data}
        case LOGIN + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case LOGOUT + '_PENDING':
            return {...state, loading: true, error: false}
        case LOGOUT + '_FULFILLED':
            return {...state, ...initialState}
        case LOGOUT + '_REJECTED':
            return {...state, loading: false, error: true}
        case REGISTER + '_PENDING':
            return {...state, loading: true, error: false}
        case REGISTER + '_FULFILLED':
            return {...state, loading: false, player: action.payload.data}
        case REGISTER + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case EDIT_PLAYER + '_PENDING':
            return {...state, loading: true, error: false}
        case EDIT_PLAYER + '_FULFILLED':
            return {...state, loading: false, player: action.payload.data}
        case EDIT_PLAYER + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case DELETE_PLAYER + '_PENDING':
            return {...state, loading: true, error: false}
        case DELETE_PLAYER + '_FULFILLED':
            return {...state, loading: false, player: {}}
        case DELETE_PLAYER + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: action.payload.response.data}
        case CLEAR_REDUCER:
            return {...state, ...initialState}
        default:
            return state;
    }
}