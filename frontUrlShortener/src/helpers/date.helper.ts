export function convertUTCToLocalTime(utcDateString:any) {
    var utcDate = new Date(utcDateString);


    var timezoneOffsetMs = new Date().getTimezoneOffset() * 60000;


    var localDate = new Date(utcDate.getTime() - timezoneOffsetMs);

    return localDate;
}