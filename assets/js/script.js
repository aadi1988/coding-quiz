

var timerEl = document.querySelector("#timer")

var btnClick = document.querySelector("#btn");

var seconds = 60;

var timeFunc = function(){
     if(seconds === 0){
         clearInterval(stopTimer);
     }
     else{
         //console.log(seconds);
         timerEl.textContent = "Time: " + seconds;
         seconds--;
     }
     
}


var stopTimer = function(){
   
    setInterval(timeFunc,1000);
}
var changeTimerEl = btnClick.addEventListener("click",stopTimer);
