(function(){

    var data = [
        {
            "flightNo" : "Al-101",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,1,4,10,00,00),
                "arrive" : new Date(2017,1,4,13,00,00)
            },
            "fare" : 4000,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },

        {
            "flightNo" : "Al-102",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,01,04,14,00,00),
                "arrive" : new Date(2017,01,04,17,15,00)
            },
            "fare" : 4000,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },
        {
            "flightNo" : "Al-103",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,01,04,15,00,00),
                "arrive" : new Date(2017,01,04,18,10,00)
            },
            "fare" : 4000,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },
        {
            "flightNo" : "Al-104",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,01,04,19,00,00),
                "arrive" : new Date(2017,01,04,21,00,00)
            },
            "fare" : 5500,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },
        {
            "flightNo" : "Al-114",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,01,05,19,00,00),
                "arrive" : new Date(2017,01,05,21,00,00)
            },
            "fare" : 5500,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },
        {
            "flightNo" : "Al-105",
            "from" : "Pune",
            "to" : "Delhi",
            "date" : {
                "departure" : new Date(2017,01,04,20,00,00),
                "arrive" : new Date(2017,01,04,22,00,00)
            },
            "fare" : 5000,
            "fromStName" : "PNQ",
            "toStName" : "DEL"
        },

        {
            "flightNo" : "Al-105",
            "from" : "Delhi",
            "to" : "Pune",
            "date" : {
                "departure" : new Date(2017,01,04,7,00,00),
                "arrive" : new Date(2017,01,04,10,00,00)
            },
            "fare" : 4000,
            "fromStName" : "DEL",
            "toStName" : "PNQ"
        },
        {
            "flightNo" : "Al-104",
            "from" : "Delhi",
            "to" : "Pune",
            "date" : {
                "departure" : new Date(2017,01,04,11,00,00),
                "arrive" : new Date(2017,01,04,14,00,00)
            },
            "fare" : 4000,
            "fromStName" : "DEL",
            "toStName" : "PNQ"
        },
        {
            "flightNo" : "Al-109",
            "from" : "Delhi",
            "to" : "Pune",
            "date" : {
                "departure" : new Date(2017,01,04,13,00,00),
                "arrive" : new Date(2017,01,04,17,00,00)
            },
            "fare" : 3000,
            "fromStName" : "DEL",
            "toStName" : "PNQ"
        },
        {
            "flightNo" : "Al-101",
            "from" : "Delhi",
            "to" : "Pune",
            "date" : {
                "departure" : new Date(2017,01,04,19,00,00),
                "arrive" : new Date(2017,01,04,21,00,00)
            },
            "fare" : 5000,
            "fromStName" : "DEL",
            "toStName" : "PNQ"
        },
        {
            "flightNo" : "Al-102",
            "from" : "Delhi",
            "to" : "Pune",
            "date" : {
                "departure" : new Date(2017,01,04,22,00,00),
                "arrive" : new Date(2017,01,04,13,59,59)
            },
            "fare" : 7000,
            "fromStName" : "DEL",
            "toStName" : "PNQ"
        }


    ];

    if(!window.FlightBooking)
        window.FlightBooking = {};
    window.FlightBooking.data = data;

})();