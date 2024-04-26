import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function usePhotoSubject(){
    return useContext(SubjectContext).s_photo
}