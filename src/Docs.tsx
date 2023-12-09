import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { extName } from "./constants"

export default function Docs() {
    const paperProps = { p: 2, my: 2 };
    return (
        <>
            <h1>Documentation</h1>
            <Paper sx={paperProps}>
                <Typography variant="h5">
                    What is {extName}?
                </Typography>
                <p>
                    {extName} allows us to hold webpages accountable,
                    by crowd-sourcing the process of fact-checking.
                    Alice may notice that an online article is misleading,
                    post a clarifying note, and Bob will then see Alice's note when
                    he stumbles upon the same article.
                </p>
            </Paper>

            <Paper sx={paperProps}>
                <Typography variant="h5">
                    How does it work?
                </Typography>
                <p>
                    Using the browser extension,
                    users post notes whenever they encounter a page that
                    contains misleading, inaccurate, or false information.
                    Other users can vote on these notes, and the most
                    helpful notes will be displayed to future visitors of
                    said page.
                    Watch out for the little notification in the browser
                    extension icon –
                    it indicates that somebody left a note
                    for the page.
                </p>
                <p>
                    On this website, users can&nbsp;
                    <Link href="/new-notes">
                        view new notes
                    </Link> and rate them, depending on how helpful they are.
                    Users can also&nbsp;
                    <Link href="/my-notes">
                        view their own notes
                    </Link>, and&nbsp;
                    <Link href="/stats">
                        view global statistics
                    </Link>.
                </p>
            </Paper>

            <Paper sx={paperProps}>
                <Typography variant="h5">
                    Examples
                </Typography>
                <p>
                    Below are some examples of pages for which users have
                    added notes:
                    <ul>
                        <li><Link href="https://www.nytimes.com/2017/08/15/us/politics/trump-charlottesville-white-nationalists.html">nytimes.com</Link></li>
                    </ul>
                </p>
            </Paper>
        </>
    )
}