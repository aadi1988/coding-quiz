

var timerEl = document.querySelector("#timer")

var btnClick = document.querySelector("#btn");

var seconds = 60;

var newContent = document.querySelector("#content");

var newSubContent = document.querySelector("#subcontent");

var btnEl = document.querySelector("#start");

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
    
    newContent.firstElementChild.textContent = "What's your name";
    newSubContent.removeChild(newSubContent.childNodes[1]);
    console.log(newSubContent.childNodes);
    var ulEl = document.createElement("ul");
    
    for(var i = 0; i<4; i++){
        var liEl = document.createElement("li");
        liEl.className = "listEl"
        var buttonEl = document.createElement("button");
        buttonEl.className = "btn";
        var text = document.createTextNode(i+1 + ". Javascript");
        buttonEl.appendChild(text);
        liEl.appendChild(buttonEl);
        ulEl.appendChild(liEl);
        buttonEl.addEventListener ("click", function() {
             window.alert("did something");
          });
    }     
    
    
    newSubContent.appendChild(ulEl);
    btnEl.removeChild(btnEl.childNodes[1]);

}
var changeTimerEl = btnClick.addEventListener("click",stopTimer);
