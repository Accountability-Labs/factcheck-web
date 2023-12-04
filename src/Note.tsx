import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import Alert, { AlertColor } from '@mui/material/Alert';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { api, Backend } from "./constants";
import useApiKey from './useApiKey';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
}));

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Not helpful',
    },
    2: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Somewhat helpful',
    },
    3: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very helpful',
    },
};

function fmtTime(dateTime: string): string {
    let parsedDateTime = new Date(Date.parse(dateTime));
    return parsedDateTime.toDateString();
}

function IconContainer(props: any) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

async function voteOnNote(apiKey: string, note_id: number, vote: number) {
    let response: Response;
    try {
        response = await fetch(Backend + api.postVote.path, {
            method: api.postVote.method,
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': apiKey,
            },
            body: JSON.stringify({ note_id: note_id, vote: vote })
        });
    } catch (err) {
        return { "error": "error talking to backend" };
    }
    return response.json();
}

function urlToHostname(url: string): string {
    const { hostname } = new URL(url);
    return hostname;
}

export default function Note(
    { note_id, url, text, vote, updatedAt, createdAt, createdBy }:
        { note_id: number, url: string, text: string, vote: any, updatedAt: any, createdAt: any, createdBy: string }
) {
    const [notification, setNotification] = useState({ severity: "", text: "" })
    const { apiKey } = useApiKey();

    return (
        <StyledPaper
            sx={{
                my: 1,
                mx: 'auto',
                p: 2,
            }}
        >
            <Grid container columns={3}>
                <Grid item xs={1} md={1} sm={1}>
                    <Typography fontWeight="light" fontSize="1em">{fmtTime(createdAt)}</Typography>
                </Grid>
                <Grid item xs={1} md={1} sm={1}>
                    <Link href={url}>{urlToHostname(url)}</Link>
                </Grid>
                <Grid item xs={1} md={1} sm={1}>
                    <Typography fontWeight="light" fontSize="1em">{createdBy}</Typography>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                    <Typography variant="body2">{text}</Typography>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                    <StyledRating
                        max={3}
                        name="highlight-selected-only"
                        defaultValue={vote?.Valid ? vote.Int32 : null}
                        onChange={(event, vote) => {
                            console.log(vote);
                            voteOnNote(apiKey, note_id, vote as number).then((response) => {
                                if ("error" in response) {
                                    setNotification({ severity: "error", text: "Failed to vote on note: " + response["error"] });
                                    return;
                                }
                                setNotification({ severity: "success", text: "Successfully voted on note!" });
                            });
                        }}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                    />
                    {notification.severity !== "" && <Alert severity={notification.severity as AlertColor}>{notification.text}</Alert>}
                </Grid>
            </Grid>
        </StyledPaper>
    )
}