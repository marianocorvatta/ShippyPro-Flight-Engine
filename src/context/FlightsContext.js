import React, { createContext, useState  } from "react";


let FlightsContext = createContext();
let { Provider, Consumer } = FlightsContext;

function FlightProvider({ children }) {

    const [airports, setAirports] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [departureAirportSelected, setdepartureAirportSelected] = useState({});
    const [arrivalAirportSelected, setArrivalAirportSelected] = useState({});
    const [directFlights, setDirectFlights] = useState([]);
    const [stopOverFlights, setStopOverFlights] = useState([]);
    const [resultLoading, setResultLoading] = useState(false);
    const [allFlights, setAllFlights] = useState([]);
    const [allFlightsLoading, setAllFlightsLoading] = useState(false);


  return (
    <Provider
      value={{
        airports, 
        setAirports,
        airlines, 
        setAirlines,
        departureAirportSelected, 
        setdepartureAirportSelected,
        arrivalAirportSelected, 
        setArrivalAirportSelected,
        directFlights, 
        setDirectFlights,
        stopOverFlights, 
        setStopOverFlights,
        resultLoading, 
        setResultLoading,
        allFlights, 
        setAllFlights,
        allFlightsLoading, 
        setAllFlightsLoading,
      }}
    >
      {children}
    </Provider>
  );
}

export { FlightProvider, Consumer as FlightConsumer, FlightsContext };
