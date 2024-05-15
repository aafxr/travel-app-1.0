"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
/**
 * класс для работы с сущностью Section
 *
 * Содержит поля:
 *
 * __id__
 * __color__
 * __title__
 * __hidden__
 *
 */
var Section = /** @class */ (function () {
    function Section(section) {
        if (!section)
            section = {};
        this.id = section.id !== undefined ? section.id : '';
        this.color = section.color !== undefined ? section.color : '';
        this.title = section.title !== undefined ? section.title : '';
        this.hidden = section.hidden !== undefined ? section.hidden : 0;
    }
    return Section;
}());
exports.Section = Section;
