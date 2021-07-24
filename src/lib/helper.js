/**
 * Convert milliseconds to seconds
 * @param {number} ms 
 * @returns seconds
 */
exports.msToSeconds = (ms) => {
    return Math.floor(ms / 1000)
}

/**
 * Convert milliseconds to minutes
 * @param {number} ms 
 * @returns minutes
 */
exports.msToMinutes = (ms) => {
    return ((ms / 1000) / 60).toFixed(2)
}

/**
 * Convert milliseconds to hours
 * @param {number} ms 
 * @returns hours
 */
exports.msToHours = (ms) => {
    return ((ms / 1000) / 60) / 60
}
