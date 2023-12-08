import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { AlertParams, api } from './constants';
import { fetchFromApi } from './util';

export default function Stats() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<AlertParams>({
        type: "info",
        text: "Stats are unavailable."
    });

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
                            <Typography fontWeight="light" fontSize="1em"># of users: {stats?.num_users}</Typography>
                        </Grid>
                        <Grid item xs={1} md={1} sm={1}>
                            <Typography fontWeight="light" fontSize="1em"># of notes: {stats?.num_notes}</Typography>
                        </Grid>
                        <Grid item xs={1} md={1} sm={1}>
                            <Typography fontWeight="light" fontSize="1em"># of votes: {stats?.num_votes}</Typography>
                        </Grid>
                    </Grid>
            }
        </>
    )
}