import React, {useState, useEffect} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useSelector} from "react-redux";
import {selectNotes} from "../redux/reduxSelectors/reduxSelectors";
import {useAppDispatch} from "../redux/store/hooks/reduxHooks";
import {changeNote, getNotes, createNote} from "../redux/reducers/notes/notes";
import { closeTextarea} from "../redux/reducers/notes/notes"
import {INote} from "../interface/app.interface";
import Note from "../components/Note";
import { format } from 'date-fns';




const Notes = () => {
    const [note, setNote] = useState<INote | null>(null)
    const [length, setLength ] = useState<number>(0)

    const dispatch = useAppDispatch()



    const {notes} = useSelector(selectNotes)


    useEffect(() => {
        dispatch(getNotes())
        setLength(notes.length)

    },[length])


    const closeTextareaFunction = (e: React.MouseEvent) => {
        if (e.target instanceof Element && !e.target.classList.contains("note__textarea")) {
            dispatch(changeNote(note!))
            dispatch(closeTextarea(note))
        }
    };


    const currentDate = new Date();
    const formattedDate = format(currentDate, `EEEE d MMMM y  HH:mm`);




    const newNote: INote = {
        id: Math.random(),
        text: notes.length <= 0 ? "# Hello, user!\n\nThis is your note. You can:\n\n• Write your tasks\n\n• Takes notes\n\n• Add a new note\n\n• Delete note" : "",
        state: false,
        date: formattedDate
    }






    return (
        <div className="note" onClick={(e) => closeTextareaFunction(e)}>
            <div className="note__head" >
                <h1 className="note__head-title">Typescript Notes</h1>
                <span  className="note__head-icon" onClick={() => {
                    dispatch(createNote(newNote))
                }}><AiOutlinePlusCircle/></span>
            </div>
            {
                notes.length ? notes.map((item) => (
                    <Note notes={notes} setLength={setLength} key={item.id} item={item} note={note!} setNote={setNote}/>
                )).reverse() : <h1 className="note__title">Your note list is empty!</h1>
            }

        </div>
    );
};

export default Notes;