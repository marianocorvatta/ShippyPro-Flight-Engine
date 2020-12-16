import React, { useContext, useState, useEffect } from "react";
import { FlightsContext } from "../context/FlightsContext";
import is from "is_js";
import { Box, Container,LinearProgress } from '@material-ui/core';
import FlightBox from './FlightBox';
import BestFlights from './BestFlights';
import FlightServices from '../services/FlightServices';

function Results() {
    let {
        directFlights, 
        stopOverFlights, 
        resultLoading,
        setAllFlights,
        setAllFlightsLoading,
      } = useContext(FlightsContext);
    
    const [init, setInit] = useState(false);

    const getAllFlights = async () => {
        setAllFlightsLoading(true);
        try {
            const resp = await FlightServices.getAllFlights();
            setAllFlights(resp.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setAllFlightsLoading(false);
        }
    };
 
    useEffect(() => {
        if(!init){
            setInit(true);
            getAllFlights();
        }
        // eslint-disable-next-line
    }, [init])

    return (
        <Container>
            {resultLoading ? <LinearProgress style={{marginTop: '25px'}}/> : is.not.empty(directFlights) && directFlights.map((d,i) => <Box key={`directFlights_${i}`} style={{marginTop: '20px', width: '100%'}}>
            <h3 style={{fontFamily: 'CircularStdBold', marginTop: '25px'}}>Direct Flights</h3>
            <FlightBox directFlight={d} />
            </Box>)}
            {is.not.empty(stopOverFlights) && <Box style={{marginTop: '20px', width: '100%'}}>
            <h3 style={{fontFamily: 'CircularStdBold', marginTop: '25px'}}>Flights with stopover</h3>
            <FlightBox stopOverFlights={stopOverFlights} stopOver={true}/>
            </Box>}

            <Box style={{marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h1 style={{fontFamily: 'CircularStdBold', textAlign: 'center'}}>Recommendations for you</h1>
                <BestFlights/>
            </Box>
        </Container>
        )
}

export default Results;