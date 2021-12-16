import {WeatherProvider} from "./components/contexts/WeatherProvider";
import Weather from './components/Weather/Weather';
// import Background from './components/Background/Background';
import './App.css';


function App() {
  return (
    <div className="App" data-testid="App">
      <WeatherProvider>
        <Weather />
        {/* <Background/> */}
      </WeatherProvider>
    </div>
  );
}

export default App;
