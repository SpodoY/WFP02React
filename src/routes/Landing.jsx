import { Stack, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Install from "../components/Install";
import AccountInfo from "../components/Avatar";
import NavBar from "../components/NavBar";
import { Poll, HowToVote } from "@mui/icons-material";

export const Landing = () => {
  const navigate = useNavigate();

  const buttonNavigation = (route) => {
    console.log("clicked");
    navigate(route);
  };

  const buttonProportions = {
    width: "20vw",
    height: "14vh"
  }

  if (window.ethereum) {
    return (
      <>
        <NavBar />
        <Stack
          maxWidth={true}
          px={"10vw"}
          direction={"column"}
          //bgcolor={"#aaa"}
          height={"90vh"}
        >
          <Stack
            flexGrow={1}
            //bgcolor={"#777"}
            direction={"row"}
            justifyContent={"right"}
          >
            <Typography
              maxWidth={"1200px"}
              fontSize={{ xs: "9vw", md: "7vw" }}
              fontWeight={"bold"}
              textAlign={"right"}
              my={"auto"}
            >
              <span>Welcome to the</span> <br />
              <span>2023 Election</span>
            </Typography>
          </Stack>
          <Stack
            flexGrow={1}
            //bgcolor={"#222"}
            maxWidth={true}
            justifyContent={"space-around"}
            alignItems={"center"}
            direction={"row"}
          >
            <Button
              sx={buttonProportions}
              onClick={() => buttonNavigation("vote")}
              variant="contained"
              endIcon={<HowToVote fontSize="50px" />}
            >
              Wählen
            </Button>
            <AccountInfo size={150} />
            <Button
              sx={buttonProportions}
              onClick={() => buttonNavigation("results")}
              variant="contained"
              endIcon={<Poll />}
            >
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
