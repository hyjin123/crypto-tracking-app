import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../App.css";
import "./Register.css"
import { Avatar, 
  Button, 
  TextField, 
  Link,
  Grid,
  Box,
  Typography,
  Container
 } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from "@mui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#d6b763',
    },
    secondary: {
      main: '#95989C',
    },
  },
});

// this code is used to change the textfield styles when static, focused, hover etc.
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& input': {
      color: 'white',
    },
    '& .MuiInput': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#d6b763',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#d6b763',
      },
      '&:hover fieldset': {
        borderColor: '#d6b763',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#d6b763',
      },
    },
  },
})(TextField);

// when the submit button is pressed, this function is invoked
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  axios.post('/login', {
    email: data.get('email'),
    password: data.get('password')
  })
    .then((res) => {
      // accesstoken, store in local storage with token.
      // everytime you make request, get it from storage and attach to axios header
      console.log("successful!");
      let token = res.data.accessToken;
      // save the token into the local storage
      localStorage.setItem("jwtToken", token);
      window.location = res.data.redirect
    })
    .catch((err) => {
      console.log(err);
    })
};

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
            backgroundColor: "#080809",
            width: 500,
            height: 500,
            p: 8
          }}
        >
          <Avatar>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color: "white"}}>
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField 
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField 
                  fullWidth
                  required
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 5, mb: 3, backgroundColor:"primary"}}
            >
              Sign in
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register">
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