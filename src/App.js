import './App.css';
import {FlightProvider} from './context/FlightsContext';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

function App() {
  return (
    <FlightProvider>
      <div className='App'>
        <NavBar/>
        <SearchBar/>
        <Results/>
      </div>
    </FlightProvider>
  );
}

export default App;
