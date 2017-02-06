describe("Form Validator,", function () {

    var html, Object, form;
    beforeEach(function(){

        html = "<div><input id='originCity'><div class='errorBox'></div></div>" + "" +
            "<div><input id='destinationCity'><div class='errorBox'></div></div>" +
            "<div><input id='departureDate'><div class='errorBox'></div></div>" +
            "<div><input id='returnDate'><div class='errorBox'></div></div>" ;

        form = document.createElement('section');
        form.innerHTML = html;

        document.body.appendChild(form);
        Object = new FlightBooking.validator();
    });

    it("origin city validator returns true if origin city enetered is not empty", function(){
        var originCity = document.getElementById('originCity');
        originCity.value = "Pune";
        var result = Object.validator.originCity("Pune", originCity);
        expect(result).toBeTruthy();

    });

    it("origin city validator returns false if origin city enetered is not empty", function(){
        var originCity = document.getElementById('originCity');
        var errorBox = originCity.nextElementSibling;
        originCity.value = "";
        var result = Object.validator.originCity("", originCity);
        expect(result).toBeFalsy();
        expect(errorBox.innerText).toBe("Origin City can not be empty.")

    });

    it("destinationCity city validator returns true if destinationCity city is empty", function(){
        var destinationCity = document.getElementById('destinationCity');
        destinationCity.value = "destinationCity";
        var result = Object.validator.destinationCity("destinationCity", destinationCity);
        expect(result).toBeTruthy();

    });

    it("destinationCity city validator returns false if destinationCity city  is empty", function(){
        var destinationCity = document.getElementById('destinationCity');
        var errorBox = destinationCity.nextElementSibling;
        destinationCity.value = "";
        var result = Object.validator.destinationCity("", destinationCity);
        expect(result).toBeFalsy();
        expect(errorBox.innerText).toBe("Departure City can not be empty.")

    });

    it("departure date validator returns true if departure date entered is not empty", function () {
        var departureDate = document.getElementById('departureDate');
        departureDate.value = "2017-02-04";
        var result = Object.validator.departureDate(departureDate.value, departureDate);
        expect(result).toBeTruthy();
    });

    it("departure date validator returns false if departure date entered is empty", function () {
        var departureDate = document.getElementById('departureDate');
        var errorBox = departureDate.nextElementSibling;
        departureDate.value = "";
        var result = Object.validator.departureDate(departureDate.value, departureDate);
        expect(result).toBeFalsy();
        expect(errorBox.innerText).toBe("Departure date can not be empty.");
    });

    it("return date validator returns true if journey is one way", function(){
        var returnDate = document.getElementById('returnDate');
        var result = Object.validator.returnDate("", returnDate);
        expect(result).toBeTruthy();
    });

    it("return date validator returns true if journey is two way and return date is greater than departure date", function(){
        var activeTab = document.createElement('div');
        var returnDate = document.getElementById('returnDate');
        activeTab.setAttribute('id', 'return');
        activeTab.classList.add('active');
        document.body.appendChild(activeTab);
        Object.departureDate = {
            value : "2017-02-04"
        };
        var result = Object.validator.returnDate("2017-02-05", returnDate);
        expect(result).toBeTruthy();

    });

    it("return date validator returns false if journey is two way and return date is less than departure date", function(){
        var activeTab = document.createElement('div');
        var returnDate = document.getElementById('returnDate');
        var errorBox = returnDate.nextElementSibling;
        activeTab.setAttribute('id', 'return');
        activeTab.classList.add('active');
        document.body.appendChild(activeTab);
        Object.departureDate = {
            value : "2017-11-04"
        };
        var result = Object.validator.returnDate("2017-02-05", returnDate);
        expect(result).toBeFalsy();
        expect(errorBox.innerText).toBe('Return date should be greater or equal than departure date.');
    });


    it("return date validator returns false if journey is two way and return date is empty", function(){
        var activeTab = document.createElement('div');
        var returnDate = document.getElementById('returnDate');
        var errorBox = returnDate.nextElementSibling;
        activeTab.setAttribute('id', 'return');
        activeTab.classList.add('active');
        document.body.appendChild(activeTab);
        Object.departureDate = {
            value : "2017-01-04"
        };
        var result = Object.validator.returnDate("", returnDate);
        expect(result).toBeFalsy();
        expect(errorBox.innerText).toBe('Return date can not be empty.');
    });

    it("clear error functions clears error if any", function(){
        var div = document.createElement('div');
        div.classList.add('error');
        Object.targets = [div];
        Object.clearErrors();
        expect(div.classList.contains('error')).toBeFalsy();
    });

    it("validate function returns validate journey details object when all validations are correct", function () {
       Object.targets = [];
       Object.originCity ={
           value : "Pune"
       };
       Object.destinationCity = {
           value : "Delhi"
       };
        Object.departureDate = {
           value : "2/2/2014"
        };
        Object.returnDate = {
            value : "2/2/2014"

        };

        var result = Object.validate();
        expect(result.originCity).toBe("Pune");
        expect(result.destinationCity).toBe("Delhi");
        expect(result.departureDate).toBe("2/2/2014");
        expect(result.returnDate).toBe("2/2/2014");

    });

    afterEach(function(){
        document.body.innerHTML = "";
    })

});