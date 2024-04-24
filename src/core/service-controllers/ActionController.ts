import {ValidationResult} from "joi";

import {Action, Context} from "../classes";
import {ActionDto} from "../classes/dto";
import {StoreName} from "../../types/StoreName";
import {
    expenseActionSchema,
    hotelActionSchema,
    limitActionSchema,
    photoActionSchema,
    placeActionSchema,
    travelActionSchema
} from "../schema-validations";
import {ControllerResponse} from "./controller-response/ControllerResponse";
import {ActionService} from "../services/ActionService";
import {ActionError} from "../errors";
import {ErrorCode} from "../errors/ErrorCode";

export class ActionController{
    // static async create<T extends {}>(ctx: Context, expense: Action<T>){
    //     try {
    //
    //     }catch (e){
    //         throw e
    //     }
    // }
    //
    // static async read(ctx: Context, expenseID:string){
    //     try {
    //
    //     }catch (e){
    //         throw e
    //     }
    // }
    //
    // static async readAll(ctx: Context, ...expenseIDs:string[]){
    //     try {
    //
    //     }catch (e){
    //         throw e
    //     }
    // }
    //
    // static async update<T extends {}>(ctx: Context, expense:Action<T>){
    //     try {
    //
    //     }catch (e){
    //         throw e
    //     }
    // }
    //
    // static async delete<T extends {}>(ctx: Context, expense:Action<T>){
    //     try {
    //
    //     }catch (e){
    //         throw e
    //     }
    // }

    static async add<T extends ActionDto>(ctx: Context, actionDto: T){
        try {
            const response = new ControllerResponse()

            let validation: ValidationResult
            switch (actionDto.entity){
                case StoreName.TRAVEL:
                    validation = travelActionSchema.validate(actionDto)
                    break
                case StoreName.EXPENSES_ACTUAL:
                case StoreName.EXPENSES_PLAN:
                    validation = expenseActionSchema.validate(actionDto)
                    break
                case StoreName.Photo:
                    validation = photoActionSchema.validate(actionDto)
                    break
                case StoreName.LIMIT:
                    validation = limitActionSchema.validate(actionDto)
                    break
                case StoreName.PLACE:
                    validation = placeActionSchema.validate(actionDto)
                    break
                case StoreName.HOTELS:
                    validation = hotelActionSchema.validate(actionDto)
                    break
                default:
                    response.ok = false
                    response.message = 'invalid action'
            }

            // @ts-ignore
            if(validation && validation.error){
                response.ok = false
                response.message = validation.error.message
                return response
            }

            const action = new Action(actionDto)
            await ActionService.add(ctx, action)
            response.action = action

            return response

        }catch (e){
            if(e instanceof ActionError && e.code === ErrorCode.ACTION_ALREADY_EXIST){
                return new ControllerResponse({ok: false, message: e.message})
            }

            throw e
        }
    }

    static async getLastActionTime(){
        try {
            return await ActionService.getLastActionTime()
        }catch (e){
            throw e
        }
    }
}
