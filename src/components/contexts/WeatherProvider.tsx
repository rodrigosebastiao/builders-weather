
import {useEffect, useCallback, useReducer, createContext} from "react";
import {reducer} from "./reducers";

// const api_url = process.env.REACT_APP_API_URL;
const device = window.innerWidth < 1024 ? "mobile" : "desktop";


interface EnumServiceItem  {
    id: number; label: any; key: any
}

interface EnumServiceItems extends Array<EnumServiceItem>{}

const WeatherContext = createContext<EnumServiceItems>([]);


const initialState = {
    device: device,
    languages: {
        active: "pt",
        "pt": {
            name: "Português",
            buttonUpdate: "Atualizar",
        },
        "en": {
            name: "English",
            buttonUpdate: "Update",
        }
    },
    units: "metric"
};

const WeatherProvider = (props: any) => {    
    const [state, dispatch] = useReducer<(state: any, action: any) => any>(reducer, initialState);


    const handleLanguage = useCallback((selectLang?: string) =>{
        const  autolang = navigator.language.split("-")[0] || document.documentElement.lang;
        state.languages.active = selectLang || autolang;
        dispatch({ type: "SET_LANGUAGE", payload: state.languages});
    }, [state.languages]);

    useEffect(()=>{
        handleLanguage();
    },[handleLanguage]);

    

    return(
        <>
            <WeatherContext.Provider value={[
                {...state, 
                handleLanguage},
                dispatch]}>
                {props.children}
            </WeatherContext.Provider>
        </>
    );
}

export {WeatherContext, WeatherProvider};