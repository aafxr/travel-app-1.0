"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDto = void 0;
var SectionDto = /** @class */ (function () {
    function SectionDto(section) {
        if (section.id !== undefined)
            this.id = section.id;
        if (section.color !== undefined)
            this.color = section.color;
        if (section.title !== undefined)
            this.title = section.title;
        if (section.hidden !== undefined)
            this.hidden = section.hidden;
    }
    return SectionDto;
}());
exports.SectionDto = SectionDto;
