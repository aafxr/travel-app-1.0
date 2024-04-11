import {DBFlagType} from "../../types/DBFlagType";

type InterestsType = {
    history?: DBFlagType
    nature?: DBFlagType
    party?: DBFlagType
    active?: DBFlagType
    child?: DBFlagType
}

export class Preference {
    static base_density = 2
    static base_depth = 2
    static base_duration = 45 * 60 * 1000
    static base_interests = {
        history: 0,
        nature: 0,
        party: 0,
        active: 0,
        child: 0,
    }

    density: 1 | 2 | 3;
    depth: 1 | 2 | 3 ;
    interests: InterestsType & Record<string, DBFlagType>


    constructor(pref?: Partial<Preference>) {
        if (!pref) {
            this.density = 2
            this.depth = 2
            this.interests = {}
            Object.assign(this.interests, Preference.base_interests)
            return
        }

        this.density = pref.density !== undefined ? pref.density : 2
        this.depth = pref.depth !== undefined ? pref.depth : 2
        this.interests = {}
        Object.assign(this.interests, Preference.base_interests)
        if (pref.interests) Object.assign(this.interests, pref.interests)
    }
}