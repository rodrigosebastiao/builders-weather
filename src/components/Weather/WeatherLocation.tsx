
interface IWeatherLocation {
    location: any
}


export default function WeatherLocation({location}: IWeatherLocation){

    return(
        <div className="weather__location">
            <h2 className="weather__city-name" data-testid="weather__city-name">{location.name}</h2>
        </div>
    );
}