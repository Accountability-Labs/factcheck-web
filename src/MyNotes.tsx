import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Backend, api } from './constants';
import useApiKey from './useApiKey';
import Note from './Note';

async function fetchMyNotes(apiKey: string) {
    let response: Response;
    try {
        response = await fetch(Backend + api.postMyNotes.path, {
            method: api.postMyNotes.method,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": apiKey,
            },
            body: JSON.stringify({ "limit": 20 })
        })
    } catch (err) {
        return { "error": "error talking to backend" };
    }
    return response.json()
}

export default function MyNotes() {
    const { apiKey } = useApiKey();
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        console.log("Fetching my notes.");
        fetchMyNotes(apiKey).then((notes) => {
            setNotes(notes);
            console.log(notes);
        });
    }, [apiKey]);
    return (
        <>
            <h1>My Notes</h1>
            {notes.hasOwnProperty("length") && notes.length === 0 ?
                <Alert severity="info">"Nobody has posted a note for this page."</Alert>
                :
                notes.length > 0 && notes.map((note) => (
                    <>
                        <Note note_id={note.id}
                            text={note.note}
                            url={note.url}
                            vote={note.vote}
                            updatedAt={note.updated_at.Valid && note.updated_at.Time}
                            createdAt={note.created_at}
                            createdBy={note.user_name} />
                    </>
                ))
            }
        </>
    )
}