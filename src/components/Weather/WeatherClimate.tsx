import UpdateButton from "./UpdateButton";


interface IWheaterClimate {
    weather: any
    currentLanguage: any
    weatherIcon:(condition: string, percent: number)=>any
    updateWeather: ()=>void
    buttonText: string
}


const celsiusOrFahrenheit = (temperature: string | number) => {
    const round = (val: any) => Math.round(Number(val));
    const tempRound = round(temperature);
    return tempRound;
}

export default function WeatherClimate({weather, weatherIcon, currentLanguage, updateWeather}: IWheaterClimate){

    return(
        <div className="weather__climate">
            <p 
                className="weather__climate-temp"
                data-testid="weather__climate-temp">
                    {celsiusOrFahrenheit(weather.current.temp)}
                    <span className="deg">°</span>
            </p>
            <p 
                className="weather__climate-conditions"
                data-testid="weather__climate-conditions">
                    <span className="weather__climate-icon">{weatherIcon(weather.current.weather[0].main, weather.current.clouds)}</span>
                    <span className="weather__climate-description">{weather.current.weather[0].description}</span>
            </p>

            <UpdateButton 
                buttonText={currentLanguage.buttonUpdate}
                updateWeather={updateWeather}
            />
        </div>
    );
}