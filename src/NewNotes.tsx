import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Backend, api } from './constants';
import useApiKey from './useApiKey';
import Note from './Note';

async function fetchNewNotes(apiKey: string) {
    let response: Response;
    try {
        response = await fetch(Backend + api.postNewNotes.path, {
            method: api.postNewNotes.method,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": apiKey,

            },
            body: JSON.stringify({ "limit": 20 })
        })
    } catch (err) {
        return { "error": "error talking to backend" };
    }
    const jsonResp = await response.json();
    return jsonResp.data;
}

export default function NewNotes() {
    const { apiKey } = useApiKey();
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        console.log("Fetching notes.");
        fetchNewNotes(apiKey).then((notes) => {
            setNotes(notes);
            console.log(notes);
        });
    }, [apiKey]);
    return (
        <>
            <h1>New Notes</h1>
            {notes.hasOwnProperty("length") && notes.length === 0 ?
                <Alert severity="info">Loading new notes...</Alert>
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