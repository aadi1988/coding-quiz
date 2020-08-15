var scoreTimeEl = document.querySelector(".high-score-time");
var scoreEl = document.createElement("a");
var timerEl = document.createElement("span");
//var timerEl = document.querySelector("#timer");
var btnClick = document.querySelector("#btn");
var seconds = 60;
var newContent = document.querySelector("#content");
var newSubContent = document.querySelector("#subcontent");
var btnEl = document.querySelector("#start");
var mainEl = document.querySelector("#main");
var finalDivEl = document.createElement("div");
var hEl = document.createElement("h2");
var h3El = document.createElement("h3");
var inputEl = document.createElement("input");
var labelEl = document.createElement("label");
var sbmtEl = document.createElement("input");
var ulEl = document.createElement("ul");
var olEl = document.createElement("ol");

var listDivEl = document.createElement("div");

var question_num = 1;
var score = new Object();
var arr = [];
var intId;
var liBtnEl = document.createElement("li");
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
        "options": ["global", "Blur(contrast)","Blur(value)","Blur(depth)"],
        "answer": "para1.value=\"New Text\""
    },

    6: {
        "question": "Which of the following events fires when form element loses focus",
        "options": ["onfocus","onblur","onclick","ondblclick"],
        "answer": "onblur"
    }
};


var saveScores = function(){
    localStorage.setItem("scores",JSON.stringify(score));
}


var timeFunc = function(){
     if(seconds < 0){
         clearInterval(intId);
     }
     else{
         //console.log(seconds);
         timerEl.textContent = "Time: " + seconds;
         seconds--;
         if (seconds === 0){
           // window.alert("Quiz over");
           finalPage();
        }
     }
     
}

var removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
    }
}

var checkInputField = function(){
    var num = ["0","1","2","3","4","5","6","7","8","9"];
    //console.log(num.includes(inputEl.value.charAt(0)));
    if (num.includes(inputEl.value.charAt(0)) || inputEl.value === "" || inputEl.value === null){
           window.alert("Please enter valid initials");
           ;
           return false;      
    }
    else{
        return true;
    }
}

var changePageFunc = function(){
    if(event.target === clearScoresBtn){
        removeAllChildNodes(listDivEl);
        ulEl.removeChild(listDivEl);
        score = {};
        localStorage.clear();
    }
    else if(event.target === goBackBtn){
        removeAllChildNodes(newSubContent);
        landingPage();
    }
}

var highScorePage = function(){
        var goBackBtn = document.createElement("button");
        var clearScoresBtn = document.createElement("button");
    
        removeAllChildNodes(scoreTimeEl);
        removeAllChildNodes(newContent);
        removeAllChildNodes(newSubContent);
        removeAllChildNodes(ulEl);
        removeAllChildNodes(listDivEl);
        var firstLiEl = document.createElement("li");
    
        if (JSON.parse(localStorage.getItem("scores"))=== null){
            score = {};
        }
        else{
            console.log("hey!");
            score = JSON.parse(localStorage.getItem("scores"));
        }    
        
        console.log(score);
    
        if (inputEl.value in score){
                score[inputEl.value].push(seconds);
                
        }
        else{
                arr = [];
                arr.push(seconds);
                score[inputEl.value] = arr;
        }
      
        
        console.log(score);
        saveScores();
        ulEl.className = "ulEl";
        hEl.textContent = "High Scores";
        hEl.className = "heading";
        firstLiEl.appendChild(hEl);
        firstLiEl.className = "firstListEl";
        ulEl.appendChild(firstLiEl);

        for (const key in score){
            for (const highScore of score[key]){
                var liEl = document.createElement("li");
                liEl.textContent = key + " : " + highScore;
                liEl.className = "listScore";
                listDivEl.appendChild(liEl);
                ulEl.appendChild(listDivEl);
            }
        }
        
       
        
        
        var text1 = document.createTextNode("Go Back");
        var text2 = document.createTextNode("Clear High Scores");
        goBackBtn.appendChild(text1);
        goBackBtn.className = "btn";
        clearScoresBtn.appendChild(text2);
        clearScoresBtn.className = "btn";
        liBtnEl.appendChild(goBackBtn);
        liBtnEl.appendChild(clearScoresBtn);
        liBtnEl.className = "liBtnEl";
        
        ulEl.appendChild(liBtnEl);
        newSubContent.appendChild(ulEl);

    
}

var highScore = function(event){
    if (event.target === sbmtEl){
        if(checkInputField()){
             highScorePage();
        }
  }
}

var finalPage = function(){
    clearInterval(intId);
    removeAllChildNodes(newSubContent);
    
    hEl.textContent = "All Done!";
    h3El.textContent = "Your final score is " + (seconds+1);
    h3El.className = "h3El";
    inputEl.name = "text";
    inputEl.type = "text";
    labelEl.htmlFor = "text";
    labelEl.textContent = "Enter initials:";
    labelEl.className = "h3El";
    sbmtEl.type = "submit";
    sbmtEl.value = "Submit";
    sbmtEl.className = "btn";
    finalDivEl.appendChild(hEl);
    finalDivEl.appendChild(h3El);
    finalDivEl.appendChild(labelEl);
    finalDivEl.appendChild(inputEl);
    finalDivEl.appendChild(sbmtEl);
    finalDivEl.className = "finalDivEl";
    newSubContent.appendChild(finalDivEl);

    

}

var edit_qa = function(){
    var question = newSubContent.querySelector(".main-heading");
    question.textContent = qacontent[question_num]["question"];
    for(var i = 0; i<4; i++){
        newSubContent.querySelectorAll(".new-btn")[i].textContent = i+1 + ". " + qacontent[question_num]["options"][i];
        
    }     
    
}

var create_qa = function(){
    
   
    removeAllChildNodes(newContent);
    //    newContent.removeChild(newContent.childNodes[1]);
    removeAllChildNodes(newSubContent);
    if (ulEl.hasChildNodes){
        removeAllChildNodes(ulEl);
    }
    console.log(ulEl);
    var firstLiEl = document.createElement("li");
    var listDivEl = document.createElement("div");
    firstLiEl.className = "firstListEl";
    
    listDivEl.className = "listDivEl";
    

    hEl.textContent =  qacontent[question_num]["question"];
    
    hEl.className = "main-heading";   
    listDivEl.appendChild(hEl);
    firstLiEl.appendChild(listDivEl);
    ulEl.className = "ulEl";
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
    
   // question_num ++;
    newSubContent.appendChild(ulEl);
    btnEl.removeChild(btnEl.childNodes[1]);
}

var stopTimer = function(){
   
    if (event.target.matches("#btn")){
         
        intId = setInterval(timeFunc,1000);
      
        
        create_qa();

    }

    else if (event.target === scoreEl){
        console.log("Entering here");
        btnEl.removeChild(btnEl.childNodes[1]);
        highScorePage();
    }

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
                //window.alert("Game Over!");
                
                finalPage();
            }
            else{
                if (seconds<=0){
                    finalPage();
                }
                else{
                    edit_qa();
                } 
            }
        },900);

    }
}

var landingPage = function(){
    var h3El1 = document.createElement("h3");
    var h3El2 = document.createElement("h3");
    var divEl = document.createElement("div");
    h3El1.textContent = "Try to answer the following code-related questions within the time limit";
    h3El2.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    console.log("Entering landing page");
    scoreEl.textContent = "View High Scores";
    scoreEl.href = "#";
    scoreEl.className = "high-score";
    timerEl.textContent = "Time: 0";
    timerEl.id = "timer";
    scoreTimeEl.appendChild(scoreEl);
    scoreTimeEl.appendChild(timerEl);
    hEl.textContent = "Coding Quiz Challenge";
    hEl.className = "main-heading";
    divEl.appendChild(hEl);
    newContent.appendChild(divEl);
    newSubContent.appendChild(h3El1);
    newSubContent.appendChild(h3El2);
    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Quiz";
    buttonEl.className = "btn";
    buttonEl.id = "btn";
    btnEl.appendChild(buttonEl);
}

landingPage();
var changeTimerEl = mainEl.addEventListener("click",stopTimer);
var optionEl = newSubContent.addEventListener("click",changeOption);
var highscoreEl = finalDivEl.addEventListener("click",highScore);
var changeFunc = liBtnEl.addEventListener("click", changePageFunc);