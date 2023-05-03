import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/loginService";

export default function Signup() {
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        signup({name: userName, email, password, password_confirmation: password}).then(() => {
            navigate('/login');
        }).catch(e => {
            setError('Not able to create user');
        });
        setLoading(false);
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
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5}>
                            <Typography variant="h5" component="div">Sign Up</Typography>
                            <Stack spacing={2}>
                                {error && <Typography variant="body2" color="error">{error}</Typography>}
                                <TextField onChange={(e) => setUserName(e.target.value)} id="outlined-basic1" label="User Name" variant="outlined" />
                                <TextField onChange={(e) => setEmail(e.target.value)} id="outlined-basic2" label="Email" variant="outlined" />
                                <TextField type="password" onChange={(e) => setPassword(e.target.value)} id="outlined-basic3" label="Password" variant="outlined" />
                            </Stack>
                            <Stack spacing={2}>
                                <LoadingButton type="submit" variant="contained" loading={loading}>Sign Up</LoadingButton>
                                <Link onClick={() => navigate('/login')} component="button" underline="hover">Already have an account? Log In</Link>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Grid>   
        </Grid>
    )
}