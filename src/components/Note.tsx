import React, {ChangeEvent, useState} from 'react';
import {BsPencil, BsTrash} from "react-icons/bs";
import {FaCheck} from "react-icons/fa";
import {changeNote, openTextarea, removeNote} from "../redux/reducers/notes/notes";
import ReactMarkdown from "react-markdown";
import {INote} from "../interface/app.interface";
import {useAppDispatch} from "../redux/store/hooks/reduxHooks";


type notesProps = {
    item: INote,
    note: INote,
    setNote: (note: INote) => void,
    setLength: (number: number) => void,
    notes: INote[]

}



const Note = ({item, note, setNote, setLength, notes}: notesProps) => {


    const dispatch = useAppDispatch()

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {

        setNote({
            ...note,
            text: e.target.value,
        })

    }
    const openTextareaFunction = (e: React.MouseEvent, item: INote) => {
        e.stopPropagation()


        dispatch(openTextarea(item.id))
        setNote({
            ...item
        });
        if (notes.filter(item => item?.state === true).length > 0){
            dispatch(changeNote(note))
        }
    }







    return (
        <div className="note__note">
            <div className="note__content-date" >
                <p className="note__content-date-text">{item.date}</p>
                <div className="note__icons">
                    {
                        item.state ? <span className="note__icons-pencil"><BsPencil/></span> :  <span className="note__icons-check"><FaCheck/></span>
                    }
                    <span onClick={() => {
                        dispatch(removeNote(item.id))
                        setLength(10)
                    }} className="note__icons-trash"><BsTrash/></span>
                </div>
            </div>
            <div>
                {
                    item.state ? <textarea
                            className="note__textarea"
                            value={note.text}
                            onChange={(e) => {
                                handleInput(e)
                            }}
                            rows={10}
                            cols={50}
                        /> :
                        <div className="note__content"
                             onClick={(e) => {
                                 openTextareaFunction(e, item)

                             }}
                        >
                            <ReactMarkdown  className="note__content-text">
                                {item.text}
                            </ReactMarkdown>
                        </div>
                }
            </div>


        </div>
    );
};

export default Note;