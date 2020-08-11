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
        "answer" : "Int"
    },

    2: {
        "question": "The condition in an if-else statement is enclosed with ___________",
        "options" : ["quotes","curly brackets", "square brackets","normal paranthesis"],
        "answer" : "normal paranthesis"
    },

    3: {
        "question": "Which method of an Array adds and removes elements from array.",
        "options" : ["Reverse","shift", "slice","splice"],
        "answer" : "splice"
    },

    4: {
        "question": "What is the syntax used to refer to an external script in html?",
        "options": ["<Script>","<body>","<head>","<title>"],
        "answer": "<Script>"
    },

    5: {
        "question": "Which variable takes precedence over others if names are same?",
        "options": ["Blur()", "Blur(contrast)","Blur(value)","Blur(depth)"],
        "answer": "para1.value=\"New Text\""
    },

    6: {
        "question": "Which of the following events fires when form element loses focus",
        "options": ["onfocus","onblur","onclick","ondblclick"],
        "answer": "onblur"
    }
};

var timeFunc = function(){
     if(seconds < 0){
         clearInterval(stopTimer);
     }
     else{
         //console.log(seconds);
         timerEl.textContent = "Time: " + seconds;
         seconds--;
         if (seconds === 0){
            window.alert("Quiz over");
        }
     }
     
}

var edit_qa = function(){
    var question = newSubContent.querySelector(".main-heading");
    question.textContent = qacontent[question_num]["question"];
    for(var i = 0; i<4; i++){
        newSubContent.querySelectorAll(".new-btn")[i].textContent = i+1 + ". " + qacontent[question_num]["options"][i];
        
    }     
    
}

var create_qa = function(){
    
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
    //newContent.appendChild(ulEl);
    for(var i = 0; i<4; i++){
        var liEl = document.createElement("li");
        liEl.className = "listEl";
        liEl.setAttribute("id",i+1);
        var buttonEl = document.createElement("button");
        buttonEl.className = "new-btn";
        var text = document.createTextNode(i+1 + ". " + qacontent[question_num]["options"][i] );
        buttonEl.appendChild(text);
        liEl.appendChild(buttonEl);
        ulEl.appendChild(liEl);
        
    }     
    
    question_num ++;
    newSubContent.appendChild(ulEl);
    btnEl.removeChild(btnEl.childNodes[1]);
}

var stopTimer = function(){
   
   

    setInterval(timeFunc,1000);
    
    create_qa();
    
}

var changeOption = function(event){
    
    console.dir(event);
    if (event.target.matches(".new-btn")){
        console.log(event.target.textContent.substr(3));
        var divEl = document.createElement("div");
        var hrEl = document.createElement("hr");
        hrEl.className = "line";
        divEl.appendChild(hrEl);
        var pEl = document.createElement("p")
        if (qacontent[question_num]["answer"] === event.target.textContent.substr(3)){
            pEl.textContent = "Correct!";
        }
        else{
            pEl.textContent = "Wrong!";
            seconds -= 10;
        }
        pEl.className="right-wrong";
        question_num++;
        divEl.appendChild(pEl);
        mainEl.appendChild(divEl);
        
        setTimeout(function(){
            mainEl.removeChild(divEl);
            if (question_num - 1 === Object.keys(qacontent).length || seconds === 0){
                window.alert("Game Over!");
            }
            else{
                if (seconds<=0){
                    window.alert("Quiz Over");
                }
                else{
                    edit_qa();
                } 
            }
        },900);

    }
}
var changeTimerEl = btnClick.addEventListener("click",stopTimer);
var optionEl = newSubContent.addEventListener("click",changeOption);