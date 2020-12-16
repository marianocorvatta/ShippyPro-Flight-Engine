import axios from "axios";


const API_TOKEN = "MN9ruQV0MFEsgOzMo8crw8gB575rsTe2H5U1y2Lj";

const FlightServices = {
    getAllFlights: () => {
      console.log(`FlightServices.getAllFlights()`);
      const url = `${process.env.REACT_APP_API_URL}/flights/all`;
      return axios.get(url, { headers: {'Authorization': `Bearer ${API_TOKEN}`}});
    },
    getFilteredFlights: (departureCode,arrivalCode) => {
      console.log(`FlightServices.getFilteredFlights(${departureCode}/to/${arrivalCode})`);
      const url = `${process.env.REACT_APP_API_URL}/flights/from/${departureCode}/to/${arrivalCode}`;
      return axios.get(url, { headers: {'Authorization': `Bearer ${API_TOKEN}`}});
    },
    getAirports: () => {
      console.log(`FlightServices.getAirports()`);
      const url = `${process.env.REACT_APP_API_URL}/airports/all`;
      return axios.get(url, { headers: {'Authorization': `Bearer ${API_TOKEN}`}});
    },
    getAirlines: () => {
      console.log(`FlightServices.getAirlines()`);
      const url = `${process.env.REACT_APP_API_URL}/airlines/all`;
      return axios.get(url, { headers: {'Authorization': `Bearer ${API_TOKEN}`}});
    },
  };
    
  export default FlightServices;