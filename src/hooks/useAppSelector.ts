import {useSelector} from "react-redux";
import {RootState} from "../redux";

export const useAppSelector = useSelector.withTypes<RootState>()