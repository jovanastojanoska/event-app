import { DateTime } from "luxon"

DateTime.prototype.format = function (format) {
    return this.toFormat(format);
}
class MyDateTime extends DateTime {
    static locationTime() {
        return this.local().setZone(window.timezone);
    }
    static parse(value) {
        return this.fromISO(value).setZone(window.timezone);
    }
    static parseTimestamp(value) {
        return this.fromMillis(+value).setZone(window.timezone);
    }
}

export default MyDateTime;