import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {INote, NotesAsync} from "../../../interface/app.interface";


const initialState:NotesAsync = {
    notes:  [],
    status: "empty",
    error: ""
}


export const getNotes = createAsyncThunk(
    "notes/getNote",
    async () => {
        try {
            const response = await axios("http://localhost:8080/notes")
            if (response.statusText !== "OK"){
                throw new Error("Ошибка при запросе данных")
            }
            return response.data

        }catch (err) {
            if (err instanceof Error){
                console.log(err.message)
            }else {
                console.log('Unexpected error', err)
            }
        }
    }
);

export const createNote = createAsyncThunk(
    "note/createNote",
        async  (note: INote) => {
            try {
                const response = await axios.post("http://localhost:8080/notes", note)
                if (response.status !== 201){
                    console.log(response)
                    throw new Error("Ошибка при запросе данных")

                }
                return response.data
            } catch (err) {
                if (err instanceof Error){
                    console.log(err.message)
                }else {
                    console.log('Unexpected error', err)
                }
            }
            }

)

export const changeNote = createAsyncThunk(
    "note/changeNote",
    async  (data: INote) => {
        try {
            const response = await axios.patch(`http://localhost:8080/notes/${data.id}`, {
                text: data.text
            })
            if (response.status !== 200){
                throw new Error("Ошибка при запросе данных")

            }
            console.log(response.data)

            return response.data
        } catch (err) {
            if (err instanceof Error){
                console.log(err.message)
            }else {
                console.log('Unexpected error', err)
            }
        }
    }

)
export const removeNote = createAsyncThunk(
    "note/removeNote",
    async  (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/notes/${id}`)
            if (response.statusText !== "OK"){
                throw new Error("Ошибка при запросе данных")
            }

            return response.data
        } catch (err) {
            if (err instanceof Error){
                console.log(err.message)
            }else {
                console.log('Unexpected error', err)
            }
        }
    }

)

const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers: {
        openTextarea: (state, action) => {
              state.notes = state.notes && state.notes.map((item) => {
                if (item.id === action.payload){
                    return {
                        ...item,
                        state: true
                    }
                }else {
                    return {
                        ...item,
                        state: false
                    }
                }

            })
        },
        closeTextarea: (state, action) => {
            state.notes = state.notes && state.notes.map((item) => {
                if (item.id === action.payload){
                    return {
                        ...item,
                        state: false
                    }
                }else {
                    return {
                        ...item,
                        state: false
                    }
                }
            })
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.status = "loading"
                state.error = ""
            })
            .addCase(getNotes.rejected,(state, action) => {
                state.status = "error"
                state.error = action.payload as string
            })
            .addCase(getNotes.fulfilled,(state, action) => {
                state.notes = action.payload
                state.status = "done"
            })
            .addCase(createNote.pending, (state) => {
                state.status = "loading"
                state.error = ""
            })
            .addCase(createNote.rejected,(state, action) => {
                state.status = "error"
                state.error = action.payload as string
            })
            .addCase(createNote.fulfilled,(state, action) => {
                state.notes = [...state.notes, action.payload]
                state.status = "done"
            })
            .addCase(changeNote.pending, (state) => {
                state.status = "loading"
                state.error = ""
            })
            .addCase(changeNote.rejected,(state, action) => {
                state.status = "error"
                state.error = action.payload as string
            })
            .addCase(changeNote.fulfilled,(state, action) => {
                const updatedNote = action.payload;
                state.notes = state.notes.map((note) =>
                    note?.id === updatedNote?.id ? updatedNote : note
                );
                state.status = "done";
            })
            .addCase(removeNote.pending, (state) => {
                state.status = "loading"
                state.error = ""
            })
            .addCase(removeNote.rejected,(state, action) => {
                state.status = "error"
                state.error = action.payload as string
            })
            .addCase(removeNote.fulfilled,(state, action) => {
                const deletedNoteId = action.payload
                state.notes = state.notes.filter((note) => note.id !== deletedNoteId)
                state.status = "done"
            })


    }
})

export default notesSlice.reducer

export const {openTextarea, closeTextarea} = notesSlice.actions