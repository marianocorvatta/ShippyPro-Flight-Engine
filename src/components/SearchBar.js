import React, { useEffect, useState,useContext  } from "react";
import { FlightsContext } from "../context/FlightsContext";
import { Box, TextField, Button  } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import Cover from '../assets/beach.jpg';
import FlightServices from '../services/FlightServices';
import { useMediaQuery } from 'react-responsive';


function SearchBar() {
    let {
        airports, 
        setAirports,
        setAirlines,
        setdepartureAirportSelected,
        setArrivalAirportSelected,
        setDirectFlights,
        setStopOverFlights,
        setResultLoading,
      } = useContext(FlightsContext);
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [init, setInit] = useState(false); 
    const [departureAirport, setDepartureAirport] = useState({});
    const [arrivalAirport, setArrivalAirport ] = useState({});
    
    
    const getAllAirports = async () => {
        try {
            const resp = await FlightServices.getAirports();
            setAirports(resp.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getAllAirlines = async () => {
        try {
            const resp = await FlightServices.getAirlines();
            setAirlines(resp.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if(!init){
            setInit(true);
            getAllAirports();
            getAllAirlines();
        };
         // eslint-disable-next-line 
    }, [init]);

    const getFlights = async () => {
        setResultLoading(true);
        try {
            const resp = await FlightServices.getFilteredFlights(departureAirport.codeIata,arrivalAirport.codeIata);
            setdepartureAirportSelected(departureAirport);
            setArrivalAirportSelected(arrivalAirport);

            let stopOver = [];
            let direct = [];

            for(let i in resp.data.data) {
                if(resp.data.data[i].departureAirportId === departureAirport.id && resp.data.data[i].arrivalAirportId === arrivalAirport.id) {
                    direct.push(resp.data.data[i]);
                } else {
                    stopOver.push(resp.data.data[i]);
                }
            }
            setDirectFlights(direct);
            setStopOverFlights(stopOver);
        } catch (e) {
            console.log(e);
        } finally {
            setResultLoading(false);
        }
    };


    return (
        <>
            <Box style={{width: '100%', height: '250px',backgroundImage: `url(${Cover})`,backgroundSize: "cover",backgroundPosition: " center   ",}} >
            <h1 style={{color: '#fff',fontFamily: 'CircularStdBold', textAlign: 'center', fontSize: isMobile ? '45px' : '65px', padding: '75px', marginTop: '60px'}}>Find your next flight</h1>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'center', marginTop: '25px', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center'}}> 
                <Autocomplete
                    id="airportsFrom"
                    options={airports}
                    getOptionLabel={(option) => option.codeIata}
                    style={{ width: 300, padding: '25px' }}
                    onChange={(event, newValue) => {
                        setDepartureAirport(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                />
                <Autocomplete
                    id="airportsTo"
                    options={airports}
                    getOptionLabel={(option) => option.codeIata}
                    style={{ width: 300, padding: '25px' }}
                    onChange={(event, newValue) => {
                        setArrivalAirport(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
                />
                <Button onClick={getFlights} style={{color: '#fff', backgroundColor: '#7349dd', fontFamily: 'CircularStd', fontSize: '1.1rem',  width: 300, margin: '25px'}}>
                    Search Flights
                    <FlightTakeoffRoundedIcon style={{marginLeft: '15px'}}/>
                </Button>
            </Box>
        </>
    )
}

export default SearchBar;
