import "./Weather.scss";
import Loader from "../Loader";

import {useContext} from "react";
import {WeatherContext} from "../contexts/WeatherProvider";
import Settings from "./Settings";
import WeatherLocation from "./WeatherLocation";
import WeatherClimate from "./WeatherClimate";
import WeatherDaily from "./WeatherDaily";
import SystemUpdating from "./SystemUpdating";


export default function Weather() {
    const [state]: any = useContext(WeatherContext);
    
    const {
        activeLang,
        currentLanguage,
        message,
        languageListOptions, 
        location, 
        weather, 
        alert,
        units, 
        updating,
        activeTheme,
        isUnitMetric,
        weatherIcon,
        handleLanguage,
        handleUnitSystem,
        convertDegreesFormat,
        updateWeather
    } = state;


    if(alert){
        return <span className="weather__alert">{alert}</span>;
    }


    if(weather){
        return (
            <div className={`weather ${units} theme theme--${activeTheme}`}>
                <div className="weather__wrapper">

                {location ?
                    <header>
                        <h1 style={{display: "none"}}>Weather</h1>

                        <WeatherLocation location={location}/>
                        <SystemUpdating 
                            updating={updating} 
                            message={message}
                        />
                    </header>
                    :null
                }
                    <WeatherClimate
                        weather={weather} 
                        weatherIcon={weatherIcon}
                        currentLanguage={currentLanguage}
                        buttonText={currentLanguage.buttonUpdate}
                        updateWeather={updateWeather}
                    />


                    <WeatherDaily
                        activeLang={activeLang}
                        weather={weather}
                        weatherIcon={weatherIcon}
                        convertDegreesFormat={convertDegreesFormat}
                    />

                    <Settings
                        isUnitMetric={isUnitMetric} 
                        activeLang={activeLang}
                        currentLanguage={currentLanguage}
                        languageListOptions={languageListOptions}
                        handleLanguage={handleLanguage}
                        handleUnitSystem={handleUnitSystem}
                    />
                </div>
            </div>
        );
    }
    return <Loader />;
}