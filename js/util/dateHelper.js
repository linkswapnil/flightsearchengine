/**
 * Created by bhalker on 02/02/17.
 */

(function(){

    function DateHelper() {}

    DateHelper.prototype.isSameDay = function(flightDate, enteredDate) {

        var flightDay = flightDate.getDate(),
            flightMonth = flightDate.getMonth(),
            flightYear = flightDate.getFullYear(),
            enteredDate = new Date(enteredDate);
        var enteredDay = enteredDate.getDate(),
            enteredMonth = enteredDate.getMonth(),
            enteredYear = enteredDate.getFullYear();

        return new Date(flightYear, flightMonth, flightDay).toString() === new Date(enteredYear, enteredMonth, enteredDay).toString();
    };

    DateHelper.prototype.parseTime = function(dateTime) {
        var date, parseString, hours, minutes, meridiem, parseString;
        date = new Date(dateTime);
        hours = date.getHours() + "";
        minutes = date.getMinutes() + "";
        minutes = (minutes.length ===1) ? "0"+minutes : minutes;
        if( (hours-12) < 0 ){
            meridiem = "AM"
        }
        else {
            meridiem = "PM";
            hours = hours - 12;
        }
        parseString = hours + "." + minutes + " " + meridiem;
        return parseString;
    };

    if(!window.FlightBooking)
        window.FlightBooking = {};
    window.FlightBooking.dateHelper = DateHelper;

})();
