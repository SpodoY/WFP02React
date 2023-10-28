import { Stack, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Install from "../components/Install";
import AccountInfo from "../components/Avatar";

export const Landing = () => {

  const navigate = useNavigate();

  if (window.ethereum) {
    return (
      <>
        <Grid sx={{width: '80%', height: '100vh', paddingY: '25vh', marginX: 'auto', gridTemplateColumns: "repeat(2, 1fr)"}} container spacing={2}>
          <Grid xs={6}>
            <Stack direction={"column"} alignItems={"center"} justifyContent="space-between">
              <AccountInfo size={200} />
              <Button 
                size="large" 
                variant="contained" 
                onClick={() => navigate("/vote")}
                sx={{ height: "4rem", width: "40%", borderRadius: '16px'}}>
                Vote Now
              </Button>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              Welcome to the 2023 Election
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return <Install />;
  }
};

export default Landing;
