(function(){

var validator, self;

    function formValidator() {
        this.originCity = document.getElementById('originCity');
        this.destinationCity = document.getElementById('destinationCity');
        this.departureDate = document.getElementById('departureDate');
        this.returnDate = document.getElementById('returnDate');
        this.targets = document.querySelectorAll('[data-validate]');
        this.activeTab = document.getElementsByClassName('activeTab')[0];

        self = this;
    }

    formValidator.prototype.validate = function() {
        var value, target, id, formOk = true, val, journeyDetails = {};
        this.clearErrors();
        for(var i=0;i<this.targets.length;i++) {
            target = this.targets[i];
            value = target.value;
            id = target.id;
            if(this.validator[id]){
                val = this.validator[id](value, target);
            }
            if(!val) {
                formOk = false;
                target.classList.add('error');
                return formOk;
            }
        }

        // If all validations are ok then send the journey details object
        journeyDetails = {
            "originCity" : this.originCity.value,
            "destinationCity" : this.destinationCity.value,
            "departureDate" : this.departureDate.value,
            "returnDate" : this.returnDate.value
        };

        return journeyDetails;
    };

    formValidator.prototype.clearErrors = function() {
        var target;
        for(var i=0;i<this.targets.length;i++) {
            target = this.targets[i];
            if(target.classList.contains('error'))
                target.classList.remove('error');
            if(target.nextElementSibling)
                target.nextElementSibling.innerText = "";
        }
    };

    formValidator.prototype.validator = {};

    formValidator.prototype.validator["originCity"] = function(value, target) {
        var removeStartingWhiteSpaces = /\s+/g,
            errorBox = target.nextElementSibling, isOk = true;

        value = value.replace(removeStartingWhiteSpaces, '');
        if(!value){
            errorBox.innerText = "Origin City can not be empty."
            isOk = false;
        }
        return isOk;
    };

    formValidator.prototype.validator["destinationCity"] = function(value, target) {
        var removeStartingWhiteSpaces = /\s+/g,
            originCity = self.originCity.value,
            errorBox = target.nextElementSibling, isOk = true;

        value = value.replace(removeStartingWhiteSpaces, '');
        if(!value){
            errorBox.innerText = "Departure City can not be empty.";
            isOk = false;
        }
        else if(value === originCity){
            errorBox.innerText = "Departure City can not be same as Origin City.";
            isOk = false;
        }
        return isOk;
    };

    formValidator.prototype.validator["departureDate"] = function(value, target) {
        var errorBox = target.nextElementSibling, isOk = true;
        if(!value) {
            errorBox.innerText = "Departure date can not be empty."
            isOk = false;
        }
        return isOk;
    };

    formValidator.prototype.validator["returnDate"] = function(value, target) {
        var errorBox = target.nextElementSibling,
            departureDate = self.departureDate.value,
            isOk = true;
        self.activeTab = document.getElementsByClassName('active')[0];
        if(self.activeTab && self.activeTab.id === 'return'){
            // return value must be greater than or equal to departure date

            if(!value) {
                errorBox.innerText = "Return date can not be empty.";
                isOk = false;
            }
            else if(value<departureDate){
                errorBox.innerText = "Return date should be greater or equal than departure date."
                isOk = false;
            }
        }

        return isOk;
    };

    if(!window.FlightBooking)
        window.FlightBooking = {};
    window.FlightBooking.validator = formValidator;

})();