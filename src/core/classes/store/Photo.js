"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
var nanoid_1 = require("nanoid");
var PhotoError_1 = require("../../errors/PhotoError");
var Photo = /** @class */ (function () {
    function Photo(photo) {
        if (!photo) {
            this.id = '';
            this.base64 = '';
            return;
        }
        this.id = photo.id;
        this.base64 = photo.base64;
    }
    Photo.fromFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () {
                var base64 = reader.result;
                if (!base64)
                    reject(PhotoError_1.PhotoError.photoLoadingFail('Не удалось прочитать файл'));
                var photo = new Photo({ id: (0, nanoid_1.nanoid)(16), base64: base64 });
                resolve(photo);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    return Photo;
}());
exports.Photo = Photo;
