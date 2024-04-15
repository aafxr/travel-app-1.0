import {Place} from "../core/classes";

export type APIPLaceType = Pick<Place, "id" | 'name' | 'formatted_address' | 'photos' | 'location'>