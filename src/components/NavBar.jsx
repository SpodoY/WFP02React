import { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const LinkTab = (props) => {
  return <Tab component="a" {...props} />;
};

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newVal) => {
    setValue(newVal)
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered aria-label="nav tabs example">
        <LinkTab label="Startseite" href="/" />
        <LinkTab label="Wählen" href="/vote2" />
        <LinkTab label="Ergebnis" href="/results" />
      </Tabs>
    </Box>
  );
};

export default NavBar;
