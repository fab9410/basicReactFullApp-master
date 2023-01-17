// Imports
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

// Imports pour les Forms
import { Formik, Form } from 'formik';
import TextFormField from "../../components/Forms/TextFormField/TextFormField";

// Import style
import "./login.css";

// Imports Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

///////////////////////////////////////////////////

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          La Centrale
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

// Fonction Formik
const initialValues = {
    email: '',
    password:''
}

const validate = values => {
    var errors = {};

    // Test de l'input pour l'email
    if(!values.email) {
        errors.email = 'Ce champs est requis !';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Ce format d'email n'est pas valide !"
    }

    // Test de l'input pour le mdp
    if(!values.password) {
        errors.password = 'Ce champs est requis !'
    }

    return errors;
}

// Composant Page de Connexion
export default function Login() {

    const theme = createTheme();

    // const { loading, error, dispatch } = useContext(AuthContext);
    const { error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (values) => {
      dispatch({type:"LOGIN_START"});
      try{
        const res = await axios.post("auth/login", values);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
      }
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Formik 
                  initialValues={initialValues} 
                  onSubmit={handleClick}
                  validate={validate}
                >
                {({values, errors, isSubmitting}) => (
                    <Form>
                        <TextFormField
                          fullWidth
                          required
                          autoFocus
                          label="Email *"
                          name = "email"
                        />
                        <TextFormField 
                          fullWidth
                          required
                          autoFocus
                          label="Password *"
                          name = "password"
                          type = "password"
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting} type="submit">
                          Se connecter
                        </Button>
                    </Form>
                )}
                </Formik>
                {error ?  <span>{error}</span> : null} 
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Pas de compte ? Inscrivez-vous 
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
}
