import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from '../assets/logo.png';

function NavBar() {
  return (
    <AppBar position='fixed'>
      <Toolbar style={{backgroundColor: '#f2f4f6'}}>
          <img src={`${Logo}`} alt="Logo" style={{width: '20%', padding: '15px 0px 15px 0px'}}/>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
