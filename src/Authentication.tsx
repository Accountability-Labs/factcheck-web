import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert, { AlertColor } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Backend, api } from './constants';

const defaultTheme = createTheme();

async function loginUser(email: string, password: string) {
    let response: Response;
    try {
        response = await fetch(Backend + api.signinUser.path, {
            method: api.signinUser.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
    } catch (err) {
        return { "error": "error talking to backend" };
    }
    return response.json()
}

export default function Authentication(
    { setApiKey }: { setApiKey: (apiKey: string) => void }
) {
    const [severity, setSeverity] = useState<string>("");
    const [text, setText] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const userData = await loginUser(
            data.email as string,
            data.password as string
        );
        console.log(userData);
        if ("error" in userData) {
            console.error(userData);
            setSeverity("error");
            setText("Failed to log in: " + userData["error"]);
            return;
        }
        setSeverity("success");
        setText("Successfully logged in!");
        setTimeout(() => {
            setApiKey(userData.data["api_key"]);
        }, 1000);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" mb={4}>
                        Sign in
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required
                                    fullWidth
                                    autoComplete="password"
                                    name="password"
                                    id="password"
                                    type="password"
                                    label="Password"
                                />
                            </Grid>
                        </Grid>
                        <Button fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign in
                        </Button>
                        <Alert severity={severity as AlertColor}>{text}</Alert>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    )
}