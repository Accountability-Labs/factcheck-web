import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { AlertParams, api } from './constants';
import { fetchFromApi } from './util';

export default function Stats() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<AlertParams>({
        type: "info",
        text: "Stats are unavailable."
    });
    const paperProps = { p: 2, mx: 1 };

    useEffect(() => {
        console.log("Fetching stats.");
        fetchFromApi(api.getStats).then((response) => {
            setLoading(false);
            if ("error" in response) {
                setAlert({ type: "error", text: response["error"] })
            } else {
                setStats(response.data);
            }
        });
    }, []);
    return (
        <>
            <h1>Stats</h1>
            {loading ?
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
                :
                stats === null ?
                    <Alert severity={alert.type}>{alert.text}</Alert>
                    :
                    <Grid container columns={3}>
                        <Grid item xs={1} md={1} sm={1}>
                            <Paper sx={paperProps}>
                                <Typography variant="h3" align="center">
                                    {stats?.num_users}
                                </Typography>
                                <Typography align="center">
                                    users
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={1} md={1} sm={1}>
                            <Paper sx={paperProps}>
                                <Typography variant="h3" align="center">
                                    {stats?.num_notes}
                                </Typography>
                                <Typography align="center">
                                    notes
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={1} md={1} sm={1}>
                            <Paper sx={paperProps}>
                                <Typography variant="h3" align="center">
                                    {stats?.num_votes}
                                </Typography>
                                <Typography align="center">
                                    votes
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
            }
        </>
    )
}