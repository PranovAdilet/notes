export interface INote {
    id: number,
    text: string,
    state: boolean,
    date: string
}

export interface NotesAsync {
    notes: INote[] | []
    status: "loading"| "error" | "done" | "empty" | null
    error: null | string,
}