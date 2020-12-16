import React, { useContext, useEffect } from "react";
import { FlightsContext } from "../context/FlightsContext";
import is from "is_js";
import { Box, List, ListItem, ListItemText, Divider,Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';


function BestFlights() {
    let { allFlights, allFlightsLoading, airlines, airports } = useContext(FlightsContext);


    return (
        <Box>
           {allFlightsLoading ? <LinearProgress/> : <><List component="nav" >
                {allFlights.sort((a, b) => a.price - b.price).slice(0,10).map((f,i) => <ListItem key={`allFlightsList_${i}`} style={{ marginTop: '5px',border: '1px solid #7349dd'}} button>
                <Box style={{display: 'flex', alignItems: 'center' }}>
                    <Typography  style={{marginLeft: '15px'}}>{airports.find((p) => p.id === f.departureAirportId)?.codeIata}</Typography>
                    <FlightTakeoffRoundedIcon style={{marginLeft: '15px'}}/>
                    <Typography style={{marginLeft: '15px'}}>{airports.find((p) => p.id === f.arrivalAirportId)?.codeIata}</Typography>
                    <ListItemText style={{marginLeft: '15px', width: '250px', fontFamily: 'CircularStdBold'}} primary={`${airlines.find((p) => p.id === f?.airlineId)?.name}`} />
                </Box>
                <Box  style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                   <Typography style={{marginRight: '15px', fontFamily: 'CircularStdBold'}}>EUR {f.price.toFixed(0)}</Typography>
                </Box>
                </ListItem>)}
            </List>
            <Divider /></>}
        </Box>
    )
}

export default BestFlights;