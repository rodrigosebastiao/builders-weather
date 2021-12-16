
export default function WeatherLocation({isUnitMetric, location}){

    return(
        <header>
            <main className="weather__location">
                <span className="weather__metrics">{isUnitMetric ? "C°" : "F°"}</span>
                <h2 className="weather__city-name" data-testid="weather__city-name">{location.name}</h2>
            </main>
        </header>
    );
}