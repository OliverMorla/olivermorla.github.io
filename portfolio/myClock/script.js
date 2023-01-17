// Created a function called digitalClock
function digitalClock(){
    // Creating a class object for the Date() class, a class implemented into vanilla javascript
    var clock = new Date();
    
    // Getting the hours, minutes, seconds stored in the Date() class and storing it into a var
    var hrs = clock.getHours();
    var min = clock.getMinutes();
    var sec = clock.getSeconds();
    var mil = clock.getMilliseconds();
    var month = clock.getMonth();
    var day = clock.getDate();
    var year = clock.getFullYear();
    var date = clock.getDay();

    // Stores session string into a var called session
    var session = "";

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById('date').innerHTML = week[date];
    
    //Adding 1 to 'month' because index starts at 0
    month++;
    
    // Ternary operators
    hrs = (hrs > 12) ? hrs - 12 : hrs;
    hrs = (hrs < 10) ? "0" + hrs : hrs;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    mil = (mil < 10) ? "0" + mil : mil;
    month = (month < 10) ? "0" + month : month;
    session = (clock.getHours() > 11) ? "PM" : "AM";

    // Assigning hrs, mins, secs to HTML elements
    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    document.getElementById('milliseconds').innerHTML = mil.toString().substring(0,2);
    document.getElementById('month').innerHTML = month;
    document.getElementById('day').innerHTML = day;
    document.getElementById('year').innerHTML = year;
    document.getElementById('session').innerHTML = session;
}

//SetInterval function call - executes function continously with delay per execution.
setInterval(digitalClock, 1);
