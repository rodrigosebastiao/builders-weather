
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_UNIT = "SET_UNIT";
export const UPDATE_INFO = "UPDATE_INFO";


export const reducer = (state, action) =>{
    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, ...action.payload.languages};
        case SET_UNIT:
            return {...state, ...action.payload.units};
        case UPDATE_INFO:
            return {...state, ...action.payload};
        default:
            throw new Error("No action matched in reducer");
    }
}