import {useAppSelector} from "./useAppSelector";
import {loadMembers, addMember, removeMember} from "../../redux/slices/members-slice";

export function useMembers() {
    const {members, error, loading} = useAppSelector(state => state.members)
    return {members, error, loading, actions: {loadMembers, addMember, removeMember}}
}