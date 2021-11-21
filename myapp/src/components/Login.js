import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import "./Register.css"
import { Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
 } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = (props) => {

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
      <Container className="fixed" component="main">
        <Box className="box"
          sx={{
            display:"flex",
            flexDirection:"column",
            alignItems: "center",
            backgroundColor: "white",
            width: 500,
            height: 500
          }}
        >
          <Avatar>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" sx={{ mt: 5}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  required
                  name="password"
                  label="Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 5, mb: 3, backgroundColor:"blue"}}
            >
              Sign in
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;