import { AppBar, Button, Box, Container, Toolbar } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{backgroundColor: '#001427', top: "auto", bottom: 0 }}>
      <Toolbar>
        <Container sx={{ flexGrow: 1, justifyContent: "space-around"}} >
            <Button variant="contained"> Vote Results </Button>
        </Container>
      </Toolbar>
    </AppBar>
    // <Container
    //     sx={{
    //         backgroundColor: '#001427',
    //         width: '100vw',
    //         height: '40px',
    //         position: 'absolute',
    //     }}
    // >
    //     a
    // </Container>
  );
};

export default NavBar;
