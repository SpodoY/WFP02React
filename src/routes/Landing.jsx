import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Install from "../components/Install";
import AccountInfo from "../components/Avatar";
import NavBar from "../components/NavBar";
import { Poll, HowToVote } from "@mui/icons-material";

export const Landing = () => {

  const navigate = useNavigate();

  const buttonNavigation = (route) => {
    console.log("clicked")
    navigate(route)
  }

  if (window.ethereum) {
    return (
      <>
        <NavBar />
        <Stack direction={"column"}>
          <Stack direction={"row"}>
            {/* Logo here */}
            <Typography width={"40vw"} fontSize={"5vw"} fontWeight={"bold"}> Welcome to the 2023 Election</Typography>
          </Stack>
          <Stack width={'100%'} justifyContent={"space-around"} gap={'2vw'} direction={"row"}>
            <Button onClick={() => buttonNavigation("vote2")} variant="contained" endIcon={<HowToVote fontSize="50px"/>}>
              Wählen
            </Button>
            <AccountInfo size={100}/>
            <Button onClick={() => buttonNavigation("results")} variant="contained" endIcon={<Poll/>}>
              Ergebnis
            </Button>
          </Stack>
        </Stack>
      </>
    );
  } else {
    return <Install />;
  }
};

export default Landing;
