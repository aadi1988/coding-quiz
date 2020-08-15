var scoreTimeEl = document.querySelector(".high-score-time"); //container with score and timer elements on landing page
var scoreEl = document.createElement("a"); //view score link
var timerEl = document.createElement("span"); //display timer
var newContent = document.querySelector("#content"); //container for heading on landing page
var newSubContent = document.querySelector("#subcontent"); // container for subheading and questions and answers
var btnEl = document.querySelector("#start"); //container for submit button on landing page
var mainEl = document.querySelector("#main"); //main section of the body
var seconds = 75; //starting value of the timer
var question_num = 1; //starting value in dictionary for questions
var intId; //interval id returned by the setInterval timer
var score = new Object(); //dictionary for storing scores
var arr = []; //array to store scores for a particular person
var listDivEl = document.createElement("div"); //container for list of scores
var inputEl = document.createElement("input"); //input element to get the person's name who is taking the quiz
var finalScore = 0; //final score for a particular person in one instance 
//Dictionary of questions, multichoice answers and expected answer
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
        "question": "How can you get the type of arguments passed to a function?",
        "options": ["using typeof operator", "using getType function","Both of the above","None of the above"],
        "answer": "using typeof operator"
    },

    6: {
        "question": "Which of the following events fires when form element loses focus",
        "options": ["onfocus","onblur","onclick","ondblclick"],
        "answer": "onblur"
    },

    7: {
        "question": "Which built-in method removes the last element from an array and returns that element?",
        "options": ["last","get", "pop", "none of the above"],
        "answer": "pop"
    },

    8: {
        "question": "Which of the following function of String object returns the character at the specified index?",
        "options": ["charAt()","charCodeAt()","concat","indexOf()"],
        "answer": "charAt()"
    },

    9: {
        "question": "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
        "options": ["substr()", "search()", "lastIndexOf()","indexOf()"],
        "answer": "indexOf()"
    },

    10: {
        "question": "Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?",
        "options": ["anchor()", "big()", "blink()", "bold()"],
        "answer": "bold()"
    },

    11: {
        "question": "Which of the following function of Array object calls a function for each element in the array?",
        "options": ["concat()","every()","filter()","forEach()"],
        "answer": "forEach()"
    },

    12: {
        "question": "Which built-in method returns the calling string value converted to lower case?",
        "options": ["tolower()","toLowerCase()","changeCase()","None of the above"],
        "answer": "toLowerCase()"
    },

    13: {

        "question": "What's value of sum: const sum = eval('10*10+5')",
        "options": ["105", "\"105\"","TypeError","10*10+5"],
        "answer": "105"
    },

    14: {
        "question": "Which company developed JavaScript?",
        "options": ["Netscape","Bell Labs", "Sun Microsystems", "IBM"],
        "answer": "Netscape"
    },

    15: {
        "question": "Which of the following is not Javascript frameworks or libraries?",
        "options": ["Polymer", "Meteor", "Cassandra", "jQuery"],
        "answer": "Cassandra"
    }
};

//save the scores in localStorage
var saveScores = function(){
    localStorage.setItem("scores",JSON.stringify(score));
}

//get scores from localStorage(if available) and append current score
var getScore = function(){
    if (JSON.parse(localStorage.getItem("scores"))=== null){
        score = {};
    }
    else{
        
        score = JSON.parse(localStorage.getItem("scores"));
    }    
    
    if (inputEl.value){
        if (inputEl.value in score){
            score[inputEl.value].push(finalScore);       
        }
        else{
            arr = [];
            arr.push(finalScore);
            score[inputEl.value] = arr;
        }
    }
}

//remove all childnodes of a given parent
var removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
       parent.removeChild(parent.firstChild);
    }
}

//Check for the validity of the user given input name
var checkInputField = function(){
    var num = ["0","1","2","3","4","5","6","7","8","9"];
    console.dir(inputEl);
    if (num.includes(inputEl.value.charAt(0)) || inputEl.value === "" || inputEl.value === null){
           window.alert("Please enter valid initials");
           ;
           return false;      
    }
    else{
        return true;
    }
}

//create a list of multichoice answers and display on the page
var createListElements = function(ulEl){
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
}

//create a list of scores and display on the page
var createHighscoreList = function(ulEl){
    
    for (const key in score){
        for (const highScore of score[key]){
            var liEl = document.createElement("li");
            liEl.textContent = key + " : " + highScore;
            liEl.className = "listScore";
            listDivEl.appendChild(liEl);
            ulEl.appendChild(listDivEl);
        }
    }  
}

//Highscore page displaying all high scores
var highScorePage = function(){
    removeAllChildNodes(scoreTimeEl);
    removeAllChildNodes(newContent);
    removeAllChildNodes(newSubContent);
    console.dir(newSubContent);
    var goBackBtn = document.createElement("button");
    var clearScoresBtn = document.createElement("button");
    var text1 = document.createTextNode("Go Back");
    var text2 = document.createTextNode("Clear High Scores");  
    var firstLiEl = document.createElement("li");
    var ulEl = document.createElement("ul");
    var hEl = document.createElement("h1");
    var liBtnEl = document.createElement("li");
    getScore();
    saveScores();
    ulEl.className = "ulEl";
    hEl.textContent = "High Scores";
    hEl.className = "heading";
    firstLiEl.appendChild(hEl);
    firstLiEl.className = "firstListEl";
    ulEl.appendChild(firstLiEl);  
    createHighscoreList(ulEl);
    goBackBtn.appendChild(text1);
    goBackBtn.className = "btn";
    goBackBtn.id = "goBackBtn";
    clearScoresBtn.appendChild(text2);
    clearScoresBtn.className = "btn";
    clearScoresBtn.id = "clearScoresBtn";
    liBtnEl.appendChild(goBackBtn);
    liBtnEl.appendChild(clearScoresBtn);
    liBtnEl.className = "liBtnEl";
    ulEl.appendChild(liBtnEl);
    newSubContent.appendChild(ulEl);
    

}

//Calling function to validate input from user and then display all high scores
var highScore = function(){

    if(checkInputField()){
         highScorePage();
    }
}

//final page to get user input name and show score for the currrent instance of the quiz
var finalPage = function(){
    //stop timer
    clearInterval(intId);
    if(seconds<=0){
        var timerEl = scoreTimeEl.querySelector("#timer");
        timerEl.textContent = "Time: 0";
    }
    removeAllChildNodes(newSubContent);  
    var hEl = document.createElement("h2");
    var h3El = document.createElement("h3");
    
    var labelEl = document.createElement("label");
    var sbmtEl = document.createElement("input");
    var finalDivEl = document.createElement("div");
    hEl.textContent = "All Done!";
    //validate seconds and make sure negative scores are not displayed.
    if (seconds <= 0){
        h3El.textContent = "Your final score is " + 0;
        finalScore = 0;
    }
    else{
        h3El.textContent = "Your final score is " + (seconds+1);
        finalScore = seconds + 1;
    } 
    h3El.className = "h3El";
    inputEl.name = "text";
    inputEl.type = "text";
    labelEl.htmlFor = "text";
    labelEl.textContent = "Enter initials:";
    labelEl.className = "h3El";
    sbmtEl.type = "submit";
    sbmtEl.value = "Submit";
    sbmtEl.className = "sbmt-btn";
    finalDivEl.appendChild(hEl);
    finalDivEl.appendChild(h3El);
    finalDivEl.appendChild(labelEl);
    finalDivEl.appendChild(inputEl);
    finalDivEl.appendChild(sbmtEl);
    finalDivEl.className = "finalDivEl";
    newSubContent.appendChild(finalDivEl);
}

//Change the questions and answers on answering the question
var editQa = function(){
    var question = newSubContent.querySelector(".main-heading");
    question.textContent = qacontent[question_num]["question"];
    for(var i = 0; i<4; i++){
        newSubContent.querySelectorAll(".new-btn")[i].textContent = i+1 + ". " + qacontent[question_num]["options"][i];
    }         
}

//first question and multichoice answers
var createQa = function(){
    removeAllChildNodes(newContent);
    //    newContent.removeChild(newContent.childNodes[1]);
    removeAllChildNodes(newSubContent);
    
    var firstLiEl = document.createElement("li");
    var listDivEl = document.createElement("div");
    var ulEl = document.createElement("ulEl");
    var hEl = document.createElement("h2");
    firstLiEl.className = "firstListEl";   
    listDivEl.className = "listDivEl";
    hEl.textContent =  qacontent[question_num]["question"];    
    hEl.className = "main-heading";   
    listDivEl.appendChild(hEl);
    firstLiEl.appendChild(listDivEl);
    ulEl.className = "ulEl";
    ulEl.appendChild(firstLiEl);
    createListElements(ulEl);
    newSubContent.appendChild(ulEl);
    if (btnEl.hasChildNodes){
        console.log("removing child nodes");
        removeAllChildNodes(btnEl);
    }
    console.dir(btnEl);
}

/*sCall the final page to display scores or the next question depending on whether
 all questions have been answered/timer has expired or not.*/
var nextPage = function(divEl){
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
               editQa();
            } 
        }
    },900);
}

/*Display whether user picked the right or wrong answer and accordingly go to the next  question*/
var displayRightWrong = function(){
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
        
        
        divEl.appendChild(pEl);
        divEl.className = "right-wrong";
        mainEl.appendChild(divEl);
        question_num++;
        nextPage(divEl);
}


/*Event listener options : 
1) Given user input to answer a question - display whether it is right or wrong
2) when quiz is over and the user gives the name and submits
3) Go back to landing page from high score page
4) Clear all high scores
*/
var changeOption = function(event){
    
    if (event.target.matches(".new-btn")){
        displayRightWrong();     
    }
    else if(event.target.matches(".sbmt-btn")){
        highScore();
    }
    else if(event.target.matches("#goBackBtn")){
        removeAllChildNodes(newSubContent);
        inputEl.value = "";
        question_num = 1;
        seconds = 75;
        removeAllChildNodes(listDivEl);
        landingPage();
    }
    else if(event.target.matches("#clearScoresBtn")){
        removeAllChildNodes(listDivEl);
        score = {};
        localStorage.clear();
    }
}

/*timer function*/
var timeFunc = function(){
    if(seconds < 0){
        clearInterval(intId);
    }
    else{
       
        timerEl.textContent = "Time: " + seconds;
        seconds--;
        if (seconds < 0){
          // Quiz is over 
          finalPage();
       }
    }
    
}

//Start the timer
var startTimer = function(){
   
    if (event.target.matches("#btn")){
        intId = setInterval(timeFunc,1000);       
        createQa(); //Start the quiz
    }
}

//When link for view high scores is clicked this function is called
var viewHighScorePage = function(){
     removeAllChildNodes(btnEl);
     highScorePage();
}
//Main Landing page
var landingPage = function(){
    var h3El1 = document.createElement("h3");
    var h3El2 = document.createElement("h3");
    var divEl = document.createElement("div");
    var hEl = document.createElement("h2");
    var buttonEl = document.createElement("button");
    var divEl2 = document.createElement("div");
    h3El1.textContent = "Try to answer the following code-related questions within the time limit";
    h3El2.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    h3El2.className = "h3El2";
    console.log("Entering landing page");
    //Timer and high scores
    scoreEl.textContent = "View High Scores";
    scoreEl.href = "#";
    scoreEl.className = "high-score";
    timerEl.textContent = "Time: 0";
    timerEl.id = "timer";
    scoreTimeEl.appendChild(scoreEl);
    scoreTimeEl.appendChild(timerEl);
    //Coding Quiz challenge header and subheaders
    hEl.textContent = "Coding Quiz Challenge";
    hEl.className = "main-heading";
    divEl.appendChild(hEl);
    divEl.className = "headerDiv";
    newContent.appendChild(divEl);
    divEl2.appendChild(h3El1);
    divEl2.appendChild(h3El2); 
    newSubContent.appendChild(divEl2);
    divEl2.className = "divEl2";
    //Start the quiz
    buttonEl.textContent = "Start Quiz";
    buttonEl.className = "btn";
    buttonEl.id = "btn";
    btnEl.appendChild(buttonEl);
}

landingPage();
//Add event listeners
var changeTimerEl = btnEl.addEventListener("click",startTimer);
var optionEl = newSubContent.addEventListener("click",changeOption);
var viewHighScores = scoreEl.addEventListener("click",viewHighScorePage);