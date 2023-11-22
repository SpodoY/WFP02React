import styled from "@emotion/styled";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const tabsStyling = {
  color: "#000",
  fontWeight: 1000,
};

const NavBar = () => {
  let location = useLocation().pathname;

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h6" fontWeight={800} ml={8}> Eine Voting App von Thomas Winter </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#EC6669",
        }}
      >
        <Tabs
          value={location}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab sx={tabsStyling} label="Startseite" href="/" value={"/"} />
          <Tab sx={tabsStyling} label="Wählen" href="/vote" value={"/vote"} />
          <Tab
            sx={tabsStyling}
            label="Ergebnis"
            href="/results"
            value={"/results"}
          />
        </Tabs>
      </Box>
    </>
  );
};

export default NavBar;
