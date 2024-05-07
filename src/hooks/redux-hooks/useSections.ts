import {useAppSelector} from "./useAppSelector";
import {loadSections, addSection, removeSection} from "../../redux/slices/sections-slice";

export function useSections() {
    const {sections, loading, error} = useAppSelector(state => state.sections)
    return {sections, loading, error, actions: {loadSections, addSection, removeSection}}
}