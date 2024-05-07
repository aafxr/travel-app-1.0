import {useAppSelector} from "./useAppSelector";
import {loadMessages, addMessage, removeMessage} from "../../redux/slices/messages-slice";

export function useMessages(){
    const {messages, loading, error} = useAppSelector(state => state.messages)
    return {messages, loading, error, actions: {loadMessages, addMessage, removeMessage}}
}