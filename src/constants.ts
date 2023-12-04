export const ApiKey = "api_key";
export const Backend = "https://factcheck.nymity.ch";
export const extName = "FactCheck"

// Path and method of our API endpoints.
export const api = {
    getStats: { method: "GET", path: "/stats" },
    postMyNotes: { method: "POST", path: "/my-notes" },
    postNewNotes: { method: "POST", path: "/new-notes" },
    postNote: { method: "POST", path: "/note" },
    postNotes: { method: "POST", path: "/notes" },
    postVote: { method: "POST", path: "/vote" },
    signinUser: { method: "POST", path: "/signin" },
    signupUser: { method: "POST", path: "/signup" },
};

// Human-readable error prefixes for each API endpoint.
export const apiErrPrefix = {
    [api.getStats.path]: "Failed to fetch stats: ",
    [api.postMyNotes.path]: "Failed to fetch my notes: ",
    [api.postNewNotes.path]: "Failed to fetch new notes: ",
    [api.postNote.path]: "Failed to post note: ",
    [api.postNotes.path]: "Failed to fetch notes: ",
    [api.postVote.path]: "Failed to submit vote: ",
    [api.signinUser.path]: "Failed to sign in: ",
    [api.signupUser.path]: "Failed to sign up: ",
};