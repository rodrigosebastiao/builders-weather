
export default function WeatherClimate({celsiusOrFahrenheit, weather, updateWeather, languages}){

    return(
        <div className="weather__climate">
            <p 
                className="weather__climate-temp"
                data-testid="weather__climate-temp">
                    {celsiusOrFahrenheit()}
            </p>
            <p 
                className="weather__climate-feelslike"
                data-testid="weather__climate-temp">
                    {weather.current.weather[0].main}
            </p>
            <button onClick={updateWeather}>{languages[languages.active].buttonUpdate}</button>
        </div>
    );
}