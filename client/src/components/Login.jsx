import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginService";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        login({ email, password }).then(response => {
            localStorage.setItem("user",  response.name);
            navigate('/dashboard');
            setLoading(false);
        }).catch(e => {
            e.then(err => {
                setError(err.error);
            });
            setEmail('');
            setPassword('');
            setLoading(false);
        });
    }

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
        >
            <Grid item xs={4}>
                <Paper style={{ textAlign: 'center',padding: '5vh'}} elevation={3}>
                    <form onSubmit={handleLogin}>
                        <Stack spacing={5}>
                            <Typography variant="h5" component="div">Login</Typography>
                            <Stack spacing={2}>
                                {error && <Typography variant="body2" color="error">{error}</Typography>}
                                <TextField 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    id="email" 
                                    label="Email" 
                                    variant="outlined" 
                                />
                                <TextField 
                                    value={password}
                                    type="password" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    id="pwd-basic" label="Password" variant="outlined" />
                            </Stack>
                            <Stack spacing={2}>
                                <LoadingButton loading={loading} type="submit" >
                                    Login
                                </LoadingButton>
                                <Link onClick={() => navigate('/signup')} component="button" underline="hover">Don't have an account? Create one</Link>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Grid>   
        </Grid>
    );
}