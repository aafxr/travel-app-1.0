import {month} from "../../constants";

/**
 *
 * @param {string | Date} start
 * @param {string | Date} end
 * @function
 * @name dateRange
 * @category Utils
 */
export default function dateRange(start: string | Date, end: string | Date) {
    if (!start && !end) return ''
    if (!start || !end || start === end) {
        const date = new Date(start || end)
        return `${date.getDate()} ${month[date.getMonth()]}`
    }

    const sd = new Date(start)
    const ed = new Date(end)

    if (sd.getMonth() === ed.getMonth()) return `${sd.getDate()} - ${ed.getDate()} ${month[sd.getMonth()]}`
    else if (sd.getFullYear() === ed.getFullYear()) return `${sd.getDate()} ${month[sd.getMonth()]} - ${ed.getDate()} ${month[ed.getMonth()]}`

    return `${sd.getDate()} ${month[sd.getMonth()]} - ${ed.getDate()} ${month[ed.getMonth()]}`
}