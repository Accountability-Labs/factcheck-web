import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { api, AlertParams } from './constants';
import useApiKey from './useApiKey';
import Note from './Note';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchFromApi } from './util';

export default function NewNotes() {
    const { apiKey } = useApiKey();
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<AlertParams>({
        type: "info",
        text: "There are no notes yet."
    });

    useEffect(() => {
        console.log("Fetching new notes.");
        fetchFromApi(
            api.postNewNotes,
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
            <h1>New Notes</h1>
            {loading ?
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
                :
                notes.length === 0 ?
                    <Alert severity={alert.type}>{alert.text}</Alert>
                    :
                    notes.map((note) => (
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