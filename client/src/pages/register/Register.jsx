// Imports
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

import './register.css';

// Imports pour les Forms
import { Formik, Form } from 'formik';
import TextFormField from "../../components/Forms/TextFormField/TextFormField";

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
import Copyright from "../../components/Copyright/Copyright";

///////////////////////////////////////////////////

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

    if(!values.firstName) {
      errors.firstName = 'Ce champs est requis !'
    }

    if(!values.lastName) {
      errors.lastName = 'Ce champs est requis !'
    }

    if(!values.pseudo) {
      errors.pseudo = 'Ce champs est requis !'
    }

    return errors;
}

// Composant Page d'inscription
export default function Register() {

    const theme = createTheme();

    const { error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (values) => {
      console.log("REGISTER.JSX", values)
      dispatch({type:"LOGIN_START"});
      try{
        console.log("REGISTER - 0")
        const res = await axios.post("auth/register", values);
        console.log("REGISTER - 1")
        dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
        console.log("REGISTER - 2")
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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
              S'inscrire
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
                        <div className="name">
                          <TextFormField 
                              required
                              autoFocus
                              label="Prénom *"
                              name = "firstName"
                              type = "text"
                          />
                          <TextFormField 
                              required
                              autoFocus
                              label="Nom *"
                              name = "lastName"
                              type = "text"
                          />
                        </div>
                        <TextFormField 
                            fullWidth
                            required
                            autoFocus
                            label="Pseudo *"
                            name = "pseudo"
                            type = "text"
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting} type="submit">
                            S'inscrire
                        </Button>
                    </Form>
                )}
                </Formik>
                {error ?  <span>{error}</span> : null} 
              <Grid container style={{justifyContent:'center'}}>
                <Grid item>
                  <Link href="/connexion" variant="body2">
                    Déjà inscrit ? Connectez-vous
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
