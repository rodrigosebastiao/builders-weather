
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_LOCATION = "SET_LOCATION";
export const SET_WEATHER = "SET_WEATHER";
export const SET_UNIT = "SET_UNIT";
export const SET_ERROR = "SET_ERROR";
export const SYSTEM_UPDATING = "SYSTEM_UPDATING";
export const SET_MESSAGE = "SET_MESSAGE";
export const SET_THEME = "SET_THEME";


export const reducer = (state, action) =>{
    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, activeLang: action.payload};
        case SET_LOCATION:
            return {...state, location: action.payload};
        case SET_WEATHER:
            return {...state, weather: action.payload};
        case SET_UNIT:
            return {...state, ...action.payload};
        case SET_ERROR:
            return {...state, alert: action.payload, hasError: true};
        case SET_THEME:
            return {...state, activeTheme: action.payload};
        case SYSTEM_UPDATING:
            return {...state, ...action.payload};
        default:
            throw new Error("No action matched in reducer");
    }
}