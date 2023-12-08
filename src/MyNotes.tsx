import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { api, AlertParams } from './constants';
import useApiKey from './useApiKey';
import Note from './Note';
import { fetchFromApi } from './util';

export default function MyNotes() {
    const { apiKey } = useApiKey();
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<AlertParams>({
        type: "info",
        text: "You have not posted any notes yet."
    });

    useEffect(() => {
        console.log("Fetching my notes.");
        fetchFromApi(
            api.postMyNotes,
            JSON.stringify({ "limit": 20 }),
            apiKey,
        ).then((response) => {
            setLoading(false);
            if ("error" in response) {
                setAlert({ type: "error", text: response["error"] })
            } else {
                setNotes(response.data);
            }
        });
    }, [apiKey]);

    return (
        <>
            <h1>My Notes</h1>
            {loading ?
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
                :
                notes.length === 0 ?
                    <Alert severity={alert.type}>{alert.text}</Alert>
                    :
                    notes.length > 0 && notes.map((note) => (
                        <Note key={note.id}
                            note_id={note.id}
                            text={note.note}
                            url={note.url}
                            vote={note.vote}
                            updatedAt={note.updated_at.Valid && note.updated_at.Time}
                            createdAt={note.created_at}
                            createdBy={note.user_name} />
                    ))
            }
        </>
    )
}