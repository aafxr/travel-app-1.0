"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_STORES = exports.DB_VERSION = exports.DB_NAME = void 0;
var StoreName_1 = require("../../types/StoreName");
var IndexName_1 = require("../../types/IndexName");
exports.DB_NAME = 'travelAppStore';
exports.DB_VERSION = 40;
exports.DB_STORES = [
    {
        name: StoreName_1.StoreName.STORE,
        key: 'name',
        indexes: [],
    },
    {
        name: StoreName_1.StoreName.CURRENCY,
        key: 'date',
        indexes: [],
    },
    {
        name: StoreName_1.StoreName.Photo,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName_1.StoreName.USERS,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName_1.StoreName.PLACE,
        key: 'id',
        indexes: [],
    },
    //================ action =====================================================================================
    {
        name: StoreName_1.StoreName.ACTION,
        key: 'id',
        indexes: [IndexName_1.IndexName.SYNCED, IndexName_1.IndexName.ENTITY, IndexName_1.IndexName.ACTION, IndexName_1.IndexName.DATETIME],
    },
    //================ expenses ===================================================================================
    {
        name: StoreName_1.StoreName.SECTION,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName_1.StoreName.LIMIT,
        key: 'id',
        indexes: [IndexName_1.IndexName.SECTION_ID, IndexName_1.IndexName.PERSONAL, IndexName_1.IndexName.PRIMARY_ENTITY_ID, IndexName_1.IndexName.USER_ID],
    },
    // {
    //     name: StoreName.EXPENSES_ACTUAL,
    //     key: 'id',
    //     indexes: [IndexName.USER_ID, IndexName.PRIMARY_ENTITY_ID, IndexName.SECTION_ID],
    // },
    // {
    //     name: StoreName.EXPENSES_PLAN,
    //     key: 'id',
    //     indexes: [IndexName.USER_ID, IndexName.PRIMARY_ENTITY_ID, IndexName.SECTION_ID],
    // },
    {
        name: StoreName_1.StoreName.EXPENSE,
        key: 'id',
        indexes: [IndexName_1.IndexName.USER_ID, IndexName_1.IndexName.PRIMARY_ENTITY_ID, IndexName_1.IndexName.SECTION_ID],
    },
    //================ travels ===================================================================================
    {
        name: StoreName_1.StoreName.TRAVEL,
        key: 'id',
        indexes: [IndexName_1.IndexName.DATE_START],
    },
    {
        name: StoreName_1.StoreName.CHECKLIST,
        key: 'id',
        indexes: [IndexName_1.IndexName.PRIMARY_ENTITY_ID],
    },
    {
        name: StoreName_1.StoreName.TRAVEL_WAYPOINTS,
        key: 'id',
        indexes: [IndexName_1.IndexName.PRIMARY_ENTITY_ID]
    },
    {
        name: StoreName_1.StoreName.UPDATE,
        key: 'primary_id',
        indexes: []
    },
    {
        name: StoreName_1.StoreName.ROUTE,
        key: 'travel_id',
        indexes: []
    },
    //================ errors ===================================================================================
    {
        name: StoreName_1.StoreName.ERRORS,
        key: 'time',
        indexes: []
    },
    //================ hotels ===================================================================================
    {
        name: StoreName_1.StoreName.HOTELS,
        key: 'id',
        indexes: [IndexName_1.IndexName.PRIMARY_ENTITY_ID]
    },
    //================ appointments =============================================================================
    {
        name: StoreName_1.StoreName.APPOINTMENTS,
        key: 'id',
        indexes: [IndexName_1.IndexName.PRIMARY_ENTITY_ID]
    },
    //================ updated Travel Info =======================================================================
    {
        name: StoreName_1.StoreName.UPDATED_TRAVEL_INFO,
        key: IndexName_1.IndexName.PRIMARY_ENTITY_ID,
        indexes: [IndexName_1.IndexName.UPDATED_AT]
    },
    //================ Travel Message =============================================================================
    {
        name: StoreName_1.StoreName.MESSAGE,
        key: 'date',
        indexes: [IndexName_1.IndexName.PRIMARY_ENTITY_ID]
    }
];
