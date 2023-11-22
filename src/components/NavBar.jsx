import { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const NavBar = ({}) => {
  let location = useLocation().pathname;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={location} centered indicatorColor="secondary">
        <Tab label="Startseite" href="/" value={"/"} />
        <Tab label="Wählen" href="/vote" value={"/vote"} />
        <Tab label="Ergebnis" href="/results" value={"/results"} />
      </Tabs>
    </Box>
  );
};

export default NavBar;
