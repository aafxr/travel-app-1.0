import {Place, Travel, User} from "./classes/StoreEntities";
import {Context} from "./classes/Context/Context";
import {Socket} from "socket.io-client";
import {DB} from "./classes/db/DB";
import ymaps from "ymaps/index";
import {Compare} from "./classes/Compare";
import {Action} from "./core/classes";
import {ActionDto} from "./core/classes/dto";


declare global {


    interface Window {
        opr?: any
        chrome?: any
        Travel: Travel.prototype
        travel: Travel
        Place: Place.prototype
        Expense: Expense.prototype
        User:User.prototype
        context: Context
        DB: DB
        Recover: Recover
        TelegramLoginWidget: {
            dataOnauth: (user) => unknown,
        }
        ymaps:ymaps,
        socket: Socket
        sendMessage: function
        Compare: Compare
        Action: Action
        ActionDto: ActionDto
    }

    interface GlobalEventHandlersEventMap{
        'expense': Event
    }
}
