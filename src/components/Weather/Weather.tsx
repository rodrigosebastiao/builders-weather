import "./Weather.scss";
import Loader from "../Loader";
// import mockWeather from "../MockAPI/weather.json";

import {useEffect, useState, useContext, useRef, useCallback} from "react";
import {WeatherContext} from "../contexts/WeatherProvider";
import Settings from "./Settings";
import WeatherLocation from "./WeatherLocation";
import WeatherClimate from "./WeatherClimate";


const backend_url = process.env.REACT_APP_API_URL;


interface Position {
    coords: {
        latitude: number
        longitude: number
    }
}


export default function Weather() {
    const [state, dispatch]: any = useContext(WeatherContext);
    const {units, languages, handleLanguage} = state;
    const [location, setLocation] = useState<any>(null);
    const [weather, setweather] = useState<any>(null);
    const [infoAlert, setInfoAlert] = useState("");
    const memoPosition = useRef<any>(null);
    const isUnitMetric = units === "metric";
    
    const fetchLocation = useCallback((position: Position) =>{
        const { coords } = position;
        const { latitude, longitude } = coords;
        memoPosition.current = position;

        // http://localhost:4000/location?latitude=-23.5325&longitude=-46.7917
        fetch(`${backend_url}/location?latitude=${latitude}&longitude=${longitude}&units=${units}`)
            .then(res=>res.json())
            .then((data)=>{
                setLocation(data[0]);
            })
            .catch((error)=>{
                console.log(error);
                setInfoAlert(error.message);
            });
    }, [units]);

    const askUserLocation = () =>{
        const success = (position: Position) =>{
            fetchLocation(position);
        }
        const fail = (error: any) =>{
            console.log(error);
            setInfoAlert(error.message);
        }
    
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            setInfoAlert("Geolocation services are not supported by this browser");
            // Some info to screen: Browser does not suppoort geolocation services
        }
    }

    useEffect(()=>{
        askUserLocation();
    }, []);


    const fetchWeather = useCallback((position: Position) =>{
        const { coords } = position;
        const { latitude, longitude } = coords;

        // http://localhost:4000/location?latitude=-23.5325&longitude=-46.7917

         fetch(`${backend_url}/weather-current?latitude=${latitude}&longitude=${longitude}&units=${units}`)
        // fetch(`${backend_url}/weather-current?city=${location.name}&units=${units}`)
            .then(res=>res.json())
            .then((data)=>{
                setweather(data);
            })
            .catch((error)=>{
                console.log(error);
                setInfoAlert(error.message);
            });

        // setweather(mockWeather);
    }, [units]);

    useEffect(()=>{
        if(location){
            fetchWeather(memoPosition.current);
        }
    }, [location, fetchWeather]);


    const celsiusOrFahrenheit = () => {
        const round = (val: any) => Math.ceil(Number(val));
        const tempRound = round(weather.current.temp);

        return <span>{tempRound}°</span>
    }

    const languageListAsArray = () => {
        const languageAsList = Object.entries(languages).map(([key, val])=>{
            const id = key;
            const prop = val;

            return {
                id, 
                prop
            }
        }, []).filter(item=>item.id !== "active");
        return languageAsList;
    }

    const languageOptions = languageListAsArray();

    const throttle = ( callback: ()=> void) => {
        callback();
    }

    const updateWeather = ()=> {
        if(memoPosition.current){
            throttle(()=>fetchLocation(memoPosition.current));
            // fetchWeather(memoPosition.current);
        } else {
            askUserLocation();
        }
    }


    if(weather || infoAlert){
        return (
            <div className={`weather  ${units}`}>
                <h1 style={{visibility: "hidden"}}>Weather</h1>

                {location ?
                    <WeatherLocation isUnitMetric={isUnitMetric} location={location}/>
                    :null
                }
                
                {weather ?
                    <>
                        <WeatherClimate 
                            languages={languages}
                            celsiusOrFahrenheit={celsiusOrFahrenheit} 
                            weather={weather} 
                            updateWeather={updateWeather}
                        />
                        <Settings
                            languages={languages}
                            languageOptions={languageOptions}
                            handleLanguage={handleLanguage}
                        />
                    </>
                    : <span className="weather__alert">{infoAlert}</span>
                }

            </div>
        );
    }
    return <Loader />;
}