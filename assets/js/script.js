var timerEl = document.querySelector("#timer")

var btnClick = document.querySelector("#btn");

var seconds = 60;

var newContent = document.querySelector("#content");

var newSubContent = document.querySelector("#subcontent");

var btnEl = document.querySelector("#start");

var mainEl = document.querySelector("#main");

var question_num = 1;

var qacontent = {
    1 : {
        "question": "Which of the following is not a data type supported by JavaScript?",
        "options" : ["boolean","string", "Int","Object"],
        "answer" : "markup"
    }
};

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
    newContent.removeChild(newContent.childNodes[1]);
    newSubContent.removeChild(newSubContent.childNodes[1]);
    
    var ulEl = document.createElement("ul");
    
    var firstLiEl = document.createElement("li");
    firstLiEl.className = "listEl";
    var hEl = document.createElement("h2");
    hEl.textContent =  qacontent[question_num]["question"];
    hEl.className = "main-heading";   
    firstLiEl.appendChild(hEl);
    ulEl.appendChild(firstLiEl);
    newContent.appendChild(ulEl);
    for(var i = 0; i<4; i++){
        var liEl = document.createElement("li");
        liEl.className = "listEl";
        liEl.setAttribute("id",i+1);
        var buttonEl = document.createElement("button");
        buttonEl.className = "new-btn";
        var text = document.createTextNode(i+1 + ". " + qacontent[1]["options"][i] );
        buttonEl.appendChild(text);
        liEl.appendChild(buttonEl);
        ulEl.appendChild(liEl);
        
    }     
    
    
    newSubContent.appendChild(ulEl);
    btnEl.removeChild(btnEl.childNodes[1]);

}

var changeOption = function(event){
    
    console.dir(event);
    if (event.target.matches(".new-btn")){
        console.log("Button clicked");
        var divEl = document.createElement("div");
        var hrEl = document.createElement("hr");
        hrEl.className = "line";
        divEl.appendChild(hrEl);
        var pEl = document.createElement("p")
        pEl.textContent = "Correct!";
        pEl.className="right-wrong";
        divEl.appendChild(pEl);
        mainEl.appendChild(divEl);
        setTimeout(function(){
            mainEl.removeChild(divEl);
        },900);
    }
}
var changeTimerEl = btnClick.addEventListener("click",stopTimer);
var optionEl = newSubContent.addEventListener("click",changeOption);