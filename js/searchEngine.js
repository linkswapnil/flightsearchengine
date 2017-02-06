/**
 * Created by bhalker on 31/01/17.
 */
(function(){


    function init() {

        window.FlightBooking.searchEngine = new SearchEngine();

    }

    function SearchEngine() {
        this.searchButton = document.getElementById('search');
        this.tabs = document.getElementById('tabs');
        this.range = document.getElementById('range');
        this.maxRange = document.getElementById('max');
        this.resultList = document.getElementById('flightInformation');
        this.breadCrumb = document.querySelector('.breadCrumb>ul');
        this.datesContainer = document.getElementsByClassName('journeyDates')[0];

        this.searchButton.onclick = this.showFlights.bind(this);
        this.tabs.onclick = this.setActiveTab.bind(this);
        this.range.onclick = this.filterFlights.bind(this);
        this.range.onkeyup = this.filterFlights.bind(this);


        this.validator = new FlightBooking.validator();
        this.dateHelper = new FlightBooking.dateHelper();
        this.flights = FlightBooking.data;

        this.filteredData = {};

    };

    SearchEngine.prototype.setActiveTab = function(e){
        var target = e.target,
            returnDate = document.getElementById('returnDate'),
            oneWayTab = document.getElementById('oneWay'),
            returnTab = document.getElementById('return');

        if(target.id==='return'){
            if(!target.classList.contains('active')){
                target.classList.add('active');
            }
            if(returnDate.classList.contains('hide'))
                returnDate.classList.remove('hide');
            if(oneWayTab.classList.contains('active'))
                oneWayTab.classList.remove('active');
        }
        else if(target.id==='oneWay'){
            if(!target.classList.contains('active')){
                target.classList.add('active');
            }
            if(!returnDate.classList.contains('hide'))
                returnDate.classList.add('hide');
            if(returnTab.classList.contains('active'))
                returnTab.classList.remove('active');
        }

        this.validator.clearErrors();
        this.clearSearchResults();
        this.filteredData = {};
        returnDate.value = "";

    };

    SearchEngine.prototype.showFlights = function(e) {
        this.clearSearchResults();
        var formDetails = this.validator.validate();
        if(formDetails) {   // All validations are correct
            this.searchFlights(formDetails);
            this.displayFlights();
        }
    };

    SearchEngine.prototype.filterFlights = function(e){
        var value = parseInt(e.target.value);
        this.updateMaxValue(value);

        var result = document.querySelectorAll('.resultList>li');
        if(result.length) {
            for(var i=0;i<result.length;i++) {
                var flight = result[i];
                var price = parseInt(flight.querySelector('.price').innerText.replace('RS ',''));
                if(price>value){
                    if(!flight.classList.contains('hide'))
                        flight.classList.add('hide');
                }
                else{
                    if(flight.classList.contains('hide'))
                        flight.classList.remove('hide');
                }
            }
        }
    };


    // Update the selected range on UI
    SearchEngine.prototype.updateMaxValue = function(value) {
        this.maxRange.innerHTML = value;
    };

    SearchEngine.prototype.searchFlights = function(flightObj) {
        var self = this;
        this.buildBreadCrumb(flightObj);    //Show BreadCrumb
        this.buildDatesMarkup(flightObj);


        var filteredData = this.flights.filter(function (flight) {
            var val = flight.from === flightObj.originCity &&
                    flight.to === flightObj.destinationCity &&
                self.dateHelper.isSameDay(flight.date.departure,flightObj.departureDate);
            return val;
        });

        this.filteredData.departureData = filteredData;

        if(flightObj.returnDate) {
            filteredData = this.flights.filter(function (flight) {
                return flight.from === flightObj.destinationCity &&
                    flight.to === flightObj.originCity &&
                    self.dateHelper.isSameDay(flight.date.arrive, flightObj.returnDate);
            });

            this.filteredData.returnData = filteredData;
        }
        console.log(this.filteredData);

    };


    SearchEngine.prototype.displayFlights = function(flight) {

        var leavingFlights = this.filteredData.departureData,
            arrivingFlights = this.filteredData.returnData,
            isTwoWayJourney = false,
            length;

        /*
                In case of two way journey the no of planes leaving could be greater than
                the no of places arriving. Hence showing repeated flight for return journey
         */
        isTwoWayJourney = arrivingFlights ? true : false;
        if(isTwoWayJourney){
            length = arrivingFlights.length;
        }

        if(leavingFlights.length === 0){
            var h2Elm = document.createElement('h2');
            h2Elm.innerText = "Sorry, no flights are available.";
            this.resultList.appendChild(h2Elm);
        }
        else{
            for(var i=0;i<leavingFlights.length;i++) {
                var arrivingFlight;
                if(isTwoWayJourney){
                    arrivingFlight = arrivingFlights[i] ? arrivingFlights[i] : arrivingFlights[length-1];
                }
                var markup = this.buildMarkUp(leavingFlights[i], arrivingFlight);
                this.resultList.appendChild(markup);
            }
        }
    };

    SearchEngine.prototype.clearSearchResults = function () {
        this.breadCrumb.innerHTML = "";
        this.resultList.innerHTML = "";
        this.datesContainer.querySelector('.departDate').innerHTML = "";
        this.datesContainer.querySelector('.returnDate').innerHTML = "";
    };

    SearchEngine.prototype.buildDatesMarkup = function(flightObj) {
        var departDate, arriveDate, departSpan, arriveSpan;
        departSpan = document.createElement('span');
        arriveSpan = document.createElement('span');

        departSpan.innerHTML = "Depart";
        arriveSpan.innerHTML = "Arrive";

        departDate = this.datesContainer.querySelector('.departDate');
        arriveDate = this.datesContainer.querySelector('.returnDate');

        departDate.appendChild(departSpan);
        departDate.append(flightObj.departureDate);

        if(flightObj.returnDate){
            arriveDate.appendChild(arriveSpan);
            arriveDate.append(flightObj.returnDate);
        }
    };

    SearchEngine.prototype.buildBreadCrumb = function(flightObj) {
        var from, to, listElmForOriginCity,listElmForDestinationCity,liElm;
        to = flightObj.destinationCity;
        from = flightObj.originCity;

        listElmForOriginCity = document.createElement('li');
        listElmForOriginCity.innerHTML = from;
        listElmForDestinationCity = document.createElement('li');
        listElmForDestinationCity.innerHTML = to;

        this.breadCrumb.appendChild(listElmForOriginCity);
        this.breadCrumb.appendChild(listElmForDestinationCity);

        if(flightObj.returnDate){
            // If journey is two way
            liElm = document.createElement('li');
            liElm.innerHTML = from;
            this.breadCrumb.appendChild(liElm);
        }
    };

    SearchEngine.prototype.buildMarkUp = function(flight, returnFlight){
        var listElm = document.createElement('li');
        var totalJourneyCost =  returnFlight ? returnFlight.fare + flight.fare : flight.fare;
        var html = '<div class="listContent">' +
            '<h3 class="price"> RS.'+ totalJourneyCost +'</h3>' +
            '<div class="flightRoute">' +
            '<div class="oneWay"><div class="flightNo">' + flight.flightNo + '</div>' +
            '<h4>'+ flight.fromStName + '>' + flight.toStName + '</h4>' +
            '<div class="time"><span>DEPART : </span>' + this.dateHelper.parseTime(flight.date.departure) + '</div>'+
            '<div class="time"><span>ARRIVE : </span>' + this.dateHelper.parseTime(flight.date.arrive) + '</div>'+
            '</div>';

        if(returnFlight){
            var twoWayDiv = '<div class="twoWay"><div class="flightNo">'+ returnFlight.flightNo +'</div>' +
                '<h4>'+ returnFlight.fromStName + '>' + returnFlight.fromStName + '</h4>' +
                '<div class="time"><span>DEPART : </span>'+ this.dateHelper.parseTime(returnFlight.date.departure) +'</div>' +
                '<div class="time"><span>ARRIVE : </span>'+ this.dateHelper.parseTime(returnFlight.date.arrive) +'</div>' +
                '</div>';

                html += twoWayDiv;
        }

        html += '</div></div><div class="imageContent">' +
            '<div class="imageBox"></div>' +
            '<button class="btn">Book this flight</button>' +
            '</div><div class="clear"></div>';


        listElm.innerHTML = html;
        return listElm;

    };

    window.onload = init;

    if(!window.FlightBooking)
        window.FlightBooking = {};

})();
