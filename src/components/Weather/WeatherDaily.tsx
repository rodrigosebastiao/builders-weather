interface IWeatherDaily {
    activeLang: string
    weather: {
        daily: Array<any>
    }
    weatherIcon:(condition: string, percent: number)=>any
    convertDegreesFormat: (degre: string | number) => any
}


export default function WeatherDaily({weather, activeLang, weatherIcon, convertDegreesFormat}: IWeatherDaily){
    const DAYS_TO_SHOW = 3;

    const date = (dt: number) => {
        const secs = 1000;
        return new Date(dt * secs).toLocaleDateString(activeLang);
    }

    return(
        <ul className="weather__daily">
           {
            weather.daily.map((current)=>{
                return(
                    <li key={current.dt} className="weather__daily-day">
                        <div className="weather__daily-date">{date(current.dt)}</div>
                        <div className="weather__daily-weather">
                            <span className={`weather__daily-icon ${current.weather[0].main} ${current.clouds ? "percent-" + current.clouds : ""}`}>
                                {weatherIcon(current.weather[0].icon, current.clouds)}
                            </span>
                            <span className="weather__daily-text">{current.weather[0].description}</span>
                        </div>
                        <div className="weather__daily-minmax">
                            <span className="weather__daily-min">{convertDegreesFormat(current.temp.min)}</span>
                            <span className="separator">/</span>
                            <span className="weather__daily-max">{convertDegreesFormat(current.temp.max)}</span>
                        </div>
                    </li>
                )
            }).filter((_, index)=> index > 0 && index <= DAYS_TO_SHOW)
           }
        </ul>
    );
}