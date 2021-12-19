import {WeatherProvider} from "./components/contexts/WeatherProvider";
import Weather from './components/Weather/Weather';
// import './App.css';


function App() {
  return (
    <div className="App" data-testid="App">
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
    </div>
  );
}

export default App;
