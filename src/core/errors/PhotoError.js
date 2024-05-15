"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoError = void 0;
var CustomError_1 = require("./CustomError");
var ErrorCode_1 = require("./ErrorCode");
var PhotoError = /** @class */ (function (_super) {
    __extends(PhotoError, _super);
    function PhotoError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoError.photoLoadingFail = function (msg) {
        var message = 'Photo loading faile.';
        if (msg)
            message += '\nExtra info:' + msg;
        return new PhotoError(message, ErrorCode_1.ErrorCode.PHOTO_LOADING_ERROR);
    };
    PhotoError.photoAlreadyExist = function (photo) {
        return new PhotoError('Фото с таким id уже существует', ErrorCode_1.ErrorCode.PHOTO_ALREADY_EXIST);
    };
    return PhotoError;
}(CustomError_1.CustomError));
exports.PhotoError = PhotoError;
