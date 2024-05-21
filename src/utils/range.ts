/**
 * Утилита создает массив индексов в диапазоне от __start__ до __(end - 1)__
 * @function
 * @name range
 * @param {number} start начало диапазона
 * @param {number} end конец диапазона (не вклбчительно)
 * @param {number} step шаг диапазона
 * @returns {number[]}
 * @category Utils
 */
export default function range(start: number, end: number, step:number = 1) {
    let output = []
    if(step === 0) step = 1
    if (typeof end === 'undefined') {
        end = start
        start = 0
    }
    for (let i = start; i <= end; i += step) {
        output.push(i)
    }
    return output
}