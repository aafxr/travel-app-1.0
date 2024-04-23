import Joi from "joi";
import {StoreName} from "../../types/StoreName";

export const hotelActionSchema = Joi.object({
    id: Joi.string().required().min(7),
    uid: Joi.string().required().min(7),
    action: Joi.string().required(),
    user_id: Joi.string().required().min(7),
    synced: Joi.number().required(),
    entity: Joi.string().equal(StoreName.PLACE).required(),
    datetime: Joi.number().required(),
    data: Joi.object({
        id: Joi.string().required().min(7)
    }).options({allowUnknown: true})
})