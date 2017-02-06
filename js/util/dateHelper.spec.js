describe("dateHelper utility", function(){

    var object;
    beforeEach(function(){
        object = new FlightBooking.dateHelper();
    });

    describe("returns time in string format,when date is passed as an object  ", function(){

        it("and time is before meridian", function(){
            var result = object.parseTime(new Date("Sat Feb 04 2017 11:21:39 GMT+0530 (IST)"));
            expect(result).toBe("11.21 AM");
        });

        it("and time is after meridian", function(){
            var result = object.parseTime(new Date("Sat Feb 04 2017 21:41:39 GMT+0530 (IST)"));
            console.log(result);
            expect(result).toBe("9.41 PM");
        });

    });

    it("return true if the flightDate and entered date represents same day", function(){
        var flightDate = new Date(), enteredDate = new Date();
        var result = object.isSameDay(flightDate, enteredDate);
        expect(result).toBeTruthy();
    });

    it("return false if the flightDate and entered date represents same day", function(){
        var flightDate = new Date(), enteredDate = new Date("Sat Feb 07 2017 11:21:39 GMT+0530 (IST)");
        var result = object.isSameDay(flightDate, enteredDate);
        expect(result).toBeFalsy();
    });

});