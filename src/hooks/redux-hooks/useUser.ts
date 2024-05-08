import {useAppSelector} from "./useAppSelector";
import {loadUser, setUser} from "../../redux/slices/user-slice";

export function useUser(){
    const {user, loading, error} = useAppSelector(state => state.user)
    return {user, loading, error, actions: {loadUser, setUser}}
}