import React, {useState, ChangeEvent, useRef, useEffect} from 'react';
import {BsTrash, BsCheckLg, BsPencil} from 'react-icons/bs'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {FaCheck} from 'react-icons/fa'
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from "react-redux";
import {selectNotes} from "../redux/reduxSelectors/reduxSelectors";
import {useAppDispatch} from "../redux/store/hooks/reduxHooks";
import {changeNote, getNotes, sendNote} from "../redux/reducers/notes/notes";
import {openTextarea, closeTextarea} from "../redux/reducers/notes/notes"
import {INote} from "../interface/app.interface";
import {log} from "util";



const Notes = () => {
    const [markdownText, setMarkdownText] = useState<string>("")
    const [note, setNote] = useState<INote | null>(null)

    const dispatch = useAppDispatch()



    const {notes} = useSelector(selectNotes)


    useEffect(() => {
        dispatch(getNotes())
    },[])
//"# Hello, World!\n" +
//         "This your first Typescript Markdown notes. You can:\n" +
//         "\n" +
//         "Click/ focus to edit\n" +
//         "\n" +
//         "Click off /Blur to save\n" +
//         "\n" +
//         "Add a new notes by clicking the plus sign above\n" +
//         "\n" +
//         "Delete this notes\n" +
//         "\n" +
//         "Markdown compiled using the fantastic typescript-markdown editable directive."


    const [id, setId] = useState<number>(0)



        const handleClick = async (e:MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target && !target.classList.contains('note__textarea')) {

                if (note)  {

                    await dispatch(changeNote(note))
                }
               await  dispatch(closeTextarea(note))
            }
        };


        useEffect(() => {
            // Добавить обработчик события click к объекту window
            window.addEventListener('click', handleClick);

            // Очистить обработчик при размонтировании компонента
            return () => {
                window.removeEventListener('click', handleClick);
            };
        }, []);



    const newNote: INote = {
        id: notes.length + 1,
        text: "",
        state: false
    }

    console.log(note)
    console.log(id)



    return (
        <div className="note" >
            <div className="note__head" >
                <h1 className="note__head-title">Typescript Markdown Notes</h1>
                <span  className="note__head-icon" onClick={() => {
                    dispatch(sendNote(newNote))
                }}><AiOutlinePlusCircle/></span>
            </div>

                    {
                        notes && notes.map((item) => (
                            <div className="note__note"
                                 key={item.id}
                            >
                                <div className="note__content-date" >
                                    <p className="note__content-date-text">Tuesday 03 April 2023 at 22:47</p>
                                    <div className="note__icons">
                                        {
                                            item.state ? <span className="note__icons-pencil"><BsPencil/></span> :  <span className="note__icons-check"><FaCheck/></span>
                                        }
                                        <span onClick={() => setMarkdownText("")} className="note__icons-trash"><BsTrash/></span>
                                    </div>
                                </div>
                                <div>
                                    {
                                        item.state ? <textarea
                                                className="note__textarea"
                                                value={markdownText}
                                                onChange={(e) => {
                                                    const updatedText = e.target.value;
                                                    setMarkdownText(updatedText);
                                                    setNote((prevNote) => ({
                                                        ...prevNote!,
                                                        text: updatedText,
                                                    }));
                                                }}
                                                rows={10}
                                                cols={50}
                                            /> :
                                            <div className="note__content"
                                                 onClick={(e) => {
                                                     e.stopPropagation()
                                                     setMarkdownText(item.text)
                                                     dispatch(openTextarea(item.id))
                                                     setId(item.id)
                                                     setNote({
                                                         ...item
                                                     })
                                                 }}
                                            >
                                                <ReactMarkdown  className="note__content-text">
                                                    {item.text}
                                                </ReactMarkdown>
                                             </div>
                                    }
                                </div>


                            </div>
                       )).reverse()
                    }


        </div>
    );
};

export default Notes;