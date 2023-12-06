import { useState, useEffect } from 'react';
import { Backend, api } from './constants';
import { Grid, Typography } from '@mui/material';

async function fetchStats() {
    let response: Response;
    try {
        response = await fetch(Backend + api.getStats.path, {
            method: api.getStats.method,
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (err) {
        return { "error": "error talking to backend" };
    }
    const jsonResp = await response.json();
    return jsonResp.data;
}

export default function Stats() {
    //const [notes, setNotes] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        console.log("Fetching stats.");
        fetchStats().then((stats) => {
            setStats(stats);
            console.log(stats);
        });
    }, []);
    return (
        <>
            <h1>Stats</h1>
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
        </>
    )
}