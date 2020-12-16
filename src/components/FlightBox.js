import React, { useContext } from "react";
import { FlightsContext } from "../context/FlightsContext";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  List, 
  Typography, 
  ListItem,
  ListItemText, 
  Divider, 
  Accordion, 
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import is from "is_js";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

function FlightBox({stopOverFlights = {},stopOver = false,directFlight}) {
    const classes = useStyles();
    let {
        airports, 
        airlines, 
        departureAirportSelected,
        arrivalAirportSelected,
      } = useContext(FlightsContext);

  
    
    return <div className={classes.root}>
    <Accordion disabled={!stopOver}>
      <AccordionSummary
        expandIcon={stopOver ? <ExpandMoreIcon /> : ''}
        aria-controls="panel1a-content"
        id={!stopOver ? `FlightBox_${directFlight.id}` : `FlightBox_${stopOverFlights[0].id}`}
      >
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <Typography className={classes.heading} style={{marginLeft: '15px'}}>{airports.find((p) => p.id === departureAirportSelected.id).codeIata}</Typography>
            <FlightTakeoffRoundedIcon style={{marginLeft: '15px'}}/>
            <Typography className={classes.heading} style={{marginLeft: '15px'}}>{airports.find((p) => p.id === arrivalAirportSelected.id).codeIata}</Typography>
            {!stopOver && <ListItemText style={{marginLeft: '15px', width: '250px', fontFamily: 'CircularStdBold'}} primary={`${airlines.find((p) => p.id === directFlight?.airlineId)?.name}`} />}
          </Box>
          <Box  style={{display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center'}}>
            {!stopOver && <Typography className={classes.heading} style={{marginRight: '15px', fontFamily: 'CircularStdBold'}}>EUR {directFlight.price}</Typography>}
            {stopOver && is.not.empty(stopOverFlights) && <Typography className={classes.heading} style={{marginRight: '15px', fontFamily: 'CircularStdBold'}}>EUR {stopOverFlights.reduce((acc, el) => (acc + el.price),0).toFixed(2)}</Typography>}
          </Box>
      </AccordionSummary>
      {stopOver && <AccordionDetails>
        <List component="nav"  style={{width: '100%'}}>
        <Divider />
        {stopOverFlights.map((s,i) => <div key={`stopOverFlights_${i}`}>
        <ListItem style={{width: '100%'}} >
          <Box style={{display: 'flex'}}>
            <ListItemText primary={airports.find((p) => p.id === s.departureAirportId).codeIata} />
            <FlightTakeoffRoundedIcon style={{marginLeft: '15px'}}/>
            <ListItemText style={{marginLeft: '15px'}} primary={airports.find((p) => p.id === s.arrivalAirportId).codeIata} />
            <ListItemText style={{marginLeft: '15px', width: '250px'}} primary={`${airlines.find((p) => p.id === s.airlineId).name}`} />
          </Box>
          <Box  style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
           <Typography className={classes.heading} style={{marginRight: '15px', fontFamily: 'CircularStdBold'}}>EUR {s.price}</Typography>
          </Box>
        </ListItem>
      <Divider /></div>)}
      </List>
      </AccordionDetails>}
    </Accordion>
  </div>
}

export default FlightBox;



