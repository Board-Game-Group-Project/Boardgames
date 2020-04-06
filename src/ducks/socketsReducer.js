const initialState = {
    filler: 'filler'
}

export default function reducer(state, action){
    if (!state) {return state = initialState}
    if (!action) {return state}

    const { type, payload} = action
    switch(type) {
        default:
            return {...state};
    }
}