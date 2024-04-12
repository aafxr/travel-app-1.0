import Joi from "joi";
import {StoreName} from "../../../types/StoreName";

export const limitActionSchema = Joi.object({
    id: Joi.string().required(),
    uid: Joi.string().required(),
    action: Joi.string().required(),
    user_id: Joi.string().required(),
    synced: Joi.number().required(),
    entity: Joi.string().equal(StoreName.LIMIT).required(),
    datetime: Joi.number().required(),
    data: Joi.object({
        id: Joi.string().required(),
        primary_entity_id: Joi.string().required()
    }).options({allowUnknown: true})
})