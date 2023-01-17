// Creating variables to later re-reassign them
var minutes = 00; 
var seconds = 00;
var milliseconds = 00;

// Retrieving value from element a& storing them in local variables
var min = document.getElementById('minutes') ;
var sec = document.getElementById('seconds');
var mil = document.getElementById('mseconds');
var myInterval, paused = true; //myInterval holds the method setInterval()

// Retrieving html element and storing it in variables
var startButton = document.querySelector('#button-start');
var stopButton = document.querySelector('#button-stop');
var resetButton = document.querySelector('#button-reset');
const darkModebtn = document.querySelector(".dark-mode-button");
const content = document.querySelector(".stopwatch-container")

// stopWatch function
function stopWatch(){
    // Every 100 milliseconds, it equates to 1 second due to setInterval() set to 10/1000 milliseconds.
    milliseconds++; 

    // Ternary operators, if else else-if  
    mil.innerHTML = (milliseconds <= 9) ? "0" + milliseconds : milliseconds.toString().substring(0,2); 
    sec.innerHTML = (milliseconds > 99) ? (milliseconds = 0, seconds+= 1) : seconds
    sec.innerHTML = (seconds <= 9) ? "0" + seconds : seconds;
    min.innerHTML = (seconds > 59) ? (seconds = 0, minutes+= 1) : minutes;
    min.innerHTML = (minutes <= 9) ? "0" + minutes: minutes;

    // Uncomment for testing purposes
    // console.log("Milliseconds: " + milliseconds);
    // console.log("Seconds: " + seconds);
    // console.log("Minutes: " + minutes);
}

// Whenever button is clicked, it will stop setInterval in case, then it will execute again
startButton.addEventListener('click', () => {
    if(paused){
        paused = false;
        clearInterval(myInterval)

        startButton.classList.add("active");
        stopButton.classList.remove("active");
     
        myInterval = setInterval(stopWatch, 10);
    }
    
});

// Whenever button is clicked, it will stop setInterval if its already running
stopButton.addEventListener('click', () => {
    clearInterval(myInterval)
    paused = true;
    stopButton.classList.add("active");
    startButton.classList.remove("active");
});

// Whenever button is clicked, it will stop and reset html elements & variables back to 0
resetButton.addEventListener('click', () => {
    clearInterval(myInterval)

    paused = true;

    stopButton.classList.remove("active")
    startButton.classList.remove("active")

    minutes = 00;
    seconds = 00;
    milliseconds = 00;
 
    min.innerHTML = "0" + minutes;
    sec.innerHTML = "0" + seconds;
    mil.innerHTML = "0" +  milliseconds;
}); 

darkModebtn.addEventListener("click", () =>{
    darkModebtn.classList.toggle("active");
    content.classList.toggle("dark");
})