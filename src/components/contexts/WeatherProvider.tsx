// import mockLocation from "../../assets/MockAPI/location.json";
// import mockWeather from "../../assets/MockAPI/weather.json";

import {useThrottledCallback} from 'use-debounce';
import {useEffect, useCallback, useReducer, createContext, useRef} from "react";
import {reducer, SET_LANGUAGE, SET_LOCATION, SET_WEATHER, SET_ERROR, SYSTEM_UPDATING, SET_UNIT} from "./reducers";


const backend_url = process.env.REACT_APP_API_URL;
const device = window.innerWidth < 1024 ? "mobile" : "desktop";


interface Position {
    coords: {
        latitude: number
        longitude: number
    }
}

interface EnumServiceItem  {
    id: number; label: any; key: any
}

interface EnumServiceItems extends Array<EnumServiceItem>{}
const WeatherContext = createContext<EnumServiceItems>([]);
const savedState = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state") || "") : "";

const initialState = savedState || {
    device: device,
    location: null, 
    weather: null,
    hasError: false,
    alert: "",
    message: "",
    updating: false,
    activeLang: "pt",
    languages: {
        "pt": {
            name: "Português",
            buttonUpdate: "Atualizar",
            updateMessage: "Atualizando...",
            updateSuccess: "Atualizado com sucesso"
        },
        "en": {
            name: "English",
            buttonUpdate: "Update",
            updateMessage: "Updating...",
            updateSuccess: "Updated successfully"
        }
    },
    activeTheme: "fading-morning",
    themes: ["fading-morning", "lime-sky", "fading-night", "boring-day", "sky-ocean", "purple-sky", "clouds"],
    units: "metric",
    isUnitMetric: true,
    hour: new Date().getHours(),
    get isDaylightHours(){
        return this.hour > 6 && this.hour < 18;
    }
};


const WeatherProvider = (props: any) => {
    const memoPosition = useRef<any>(null);
    const [state, dispatch] = useReducer<(state: any, action: any) => any>(reducer, initialState);
    const {units, languages, location, activeLang, isDaylightHours} = state;
    const currentLanguage = languages[activeLang];

    const handleLanguage = useThrottledCallback((selectLang?: string) =>{
        updateMessageSytems();

        const autolang = navigator.language.split("-")[0] || document.documentElement.lang;
        const activeLang: string = selectLang || autolang;
        dispatch({ type: SET_LANGUAGE, payload: activeLang});
    }, 3000);


    const getLocation = useCallback((position: Position) =>{
        const { coords } = position;
        const { latitude, longitude } = coords;
        memoPosition.current = position;

        // dispatch({ type: SET_ERROR, payload: "alert"});
        // dispatch({ type: SET_LOCATION, payload: mockLocation});

        // http://localhost:4000/location?latitude=-23.5325&longitude=-46.7917
        fetch(`${backend_url}/location?latitude=${latitude}&longitude=${longitude}&units=${units}&lang=${activeLang}`)
            .then(res=>res.json())
            .then((data)=>{
                if(data.status > 300){
                    const alert = data.message;
                    dispatch({ type: SET_ERROR, payload: alert});
                    return;
                }
                const location = data[0];
                dispatch({ type: SET_LOCATION, payload: location});
            })
            .catch((error)=>{
                console.log(error);
                const alert = "API Location: " + error.message;
                dispatch({ type: SET_ERROR, payload: alert});
            });
    }, [units, activeLang]);


    const askUserLocation = useCallback(() =>{
        const success = (position: Position) =>{
            getLocation(position);
        }
        const fail = (error: any) =>{
            console.log(error);
            const alert = error.message;
            dispatch({ type: SET_ERROR, payload: alert});
        }
    
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            const alert = "Geolocation services are not supported by this browser";
            dispatch({ type: SET_ERROR, payload: alert});
        }        
    }, [getLocation]);

    useEffect(()=>{
        askUserLocation();
    }, [askUserLocation]);


    const getWeather = useCallback((position: Position) =>{
        if(!position){ return;}

        const { coords } = position;
        const { latitude, longitude } = coords;
        
        // dispatch({ type: SET_WEATHER, payload: mockWeather});

        // http://localhost:4000/location?latitude=-23.5325&longitude=-46.7917
        // fetch(`${backend_url}/weather-current?city=${location.name}&units=${units}`)

         fetch(`${backend_url}/weather-current?latitude=${latitude}&longitude=${longitude}&units=${units}&lang=${activeLang}`)
            .then(res=>res.json())
            .then((data)=>{
                if(data.status > 300){
                    dispatch({ type: SET_ERROR, payload: data.message});
                    return;
                }            
                dispatch({ type: SET_WEATHER, payload: data});
            })
            .catch((error)=>{
                console.log("API Weather: error", error);
                dispatch({ type: SET_ERROR, payload: error.message});
            });
    }, [units, activeLang]);

    useEffect(()=>{
        if(memoPosition.current){
            getWeather(memoPosition.current);
        }
    }, [location, getWeather]);


    const handleUnitSystem = useThrottledCallback(async (userUnitSelected: "metric" | "imperial") => {
        updateMessageSytems();
        const isUnitMetric = userUnitSelected === "metric";
        const toggleCurrentUnit = isUnitMetric ? "imperial" : "metric";
        const applyUserOrToggle = userUnitSelected || toggleCurrentUnit;
        dispatch({ type: SET_UNIT, payload: {units: applyUserOrToggle, isUnitMetric: isUnitMetric}});
    }, 3000);


    const languageListAsArray = () => {       
        const languageAsList = Object.entries(languages).map(([key, val])=>{
            const id = key;
            const prop = val;

            return {
                id, 
                prop
            }
        }, []);
        return languageAsList;
    }

    const languageListOptions = languageListAsArray();

    async function updateMessageSytems(){
        const syntheticTimer = Math.random() * (1500 - 500) + 1500;
        const syntheticTimer2 = Math.random() * (1000 - 500) + 1000;

        navigator.vibrate(100);

        dispatch({ type: SYSTEM_UPDATING, payload: {message: currentLanguage.updateMessage, updating: true}});
        await new Promise((resolve)=>setTimeout(resolve, syntheticTimer));

        dispatch({ type: SYSTEM_UPDATING, payload: {message: currentLanguage.updateSuccess, updating: true}});
        await new Promise((resolve)=>setTimeout(resolve, syntheticTimer2));

        dispatch({ type: SYSTEM_UPDATING, payload: {message: "", updating: false}});
    }

    const convertDegreesFormat = (degrees: string | number) => {
        const round = (val: any) => Math.ceil(Number(val));
        const tempRound = round(degrees);
        return <span>{tempRound}°</span>
    }

    const updateWeather = useThrottledCallback(async ()=> {
        updateMessageSytems();

        if(memoPosition.current){
            // getLocation(memoPosition.current);
            getWeather(memoPosition.current);
        } else {
            askUserLocation();
        }
    }, 5000);
    

    function weatherIcon(condition: string, percent: number){
        const conditionName = condition.toLowerCase();
        const isDayOrNight = isDaylightHours ? "day" : "night";
        

        if(conditionName === "rain" || conditionName === "drizzle"){
            if(percent <= 25 || conditionName === "drizzle") {
                return <i className={`wi wi-raindrops`}></i>;
            }
            if(percent <= 50) {
                return <i className={`wi wi-${isDayOrNight}-rain-mix`}></i>;
            }
            if(percent <= 75) {
                return <i className={`wi wi-${isDayOrNight}-rain`}></i>;
            }
            return <i className={`wi wi-${isDayOrNight}-rain`}></i>;
        }

        if(conditionName === "clouds"){
            if(percent <= 25) {
                return <i className={`wi ${isDaylightHours ? "wi-day-sunny" : "wi-night-clear"}`}></i>;
            }
            if(percent <= 50) {
                return <i className={`wi wi-${isDayOrNight}-cloudy`}></i>;
            }
            if(percent <= 75) {
                return <i className={`wi ${isDaylightHours ? "wi-sunny-overcast" : "wi-night-alt-partly-cloudy"}`}></i>;
            }
            return <i className={`wi wi-cloudy`}></i>;
        }
    }

    if(!state.hasError){
        localStorage.setItem("state", JSON.stringify(state));
    }
    
    localStorage.getItem("developer") && console.log("state", state);

    return(
        <WeatherContext.Provider value={[
            {
                ...state,
                languageListOptions,
                currentLanguage,
                convertDegreesFormat,
                updateWeather,
                weatherIcon,
                handleLanguage,
                handleUnitSystem
            },
            dispatch]}>
            {props.children}
        </WeatherContext.Provider>
    );
}

export {WeatherContext, WeatherProvider};