import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {addMessageWithSaga, addMessageWithThunk} from "../store/messages/actions";
import {getTime} from "../lib/getTime";
import {getDatabase, push, ref, set} from "firebase/database";
import firebase from "../services/firebase";

const ControlPanel = () => {


    const [value, setValue] = useState('');
    const inputFocus = useRef(null);
    const profileName = useSelector(state => state.profile.name);
    // const dispatch = useDispatch();
    const {chatId} = useParams();


    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, [value]);


    const handleButton = useCallback(
        () => {

            const message = {
                text: value,
                author: profileName
            };

            const db = getDatabase(firebase);
            const messageRef = ref(db, `/messages/${chatId}`);
            const newMessageRef = push(messageRef);
            set(newMessageRef, message).then((res) => console.log(res));


            setValue('');
        }, [value, chatId, profileName]);


    useEffect(() => {
        inputFocus.current.focus();
    }, []);

    //Auto scrolling
    // useEffect(() => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    //     inputFocus.current.focus();
    // });

    return (
        <form className={"my-form"}>
            <input
                ref={inputFocus}
                required={true}
                onChange={handleChange}
                autoFocus={true}
                placeholder={" Write something here , please!"}
                className={"textarea"}
                value={value}
                id="text-here"
            />
            <Button
                className={"send-button"}
                disabled={!value}
                onClick={handleButton}
                variant="contained"
                endIcon={<SendIcon/>}
            >
                Send
            </Button>
        </form>
    )
}

// const updateMessageList = (e) => {
//     setMessageList((prevMessageList) =>
//         prevMessageList.concat({
//             author: login.me,
//             text: chatMessage,
//             time: currentTime,
//         })
//     );
//     setChatMessage("");
// };

export default ControlPanel