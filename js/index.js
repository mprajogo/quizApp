/* ***************************
  JWD JavaScript Assessment
  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and your own code, to finish the app. 
  
  The tasks you need to do are below.
    TASKS TODO:
      [DONE] 1. Add 2 more questions to the app (each question must have 4 options). 
      [DONE] 2. Calculate the score as the total of the number of correct answers
      [DONE] 3. Add an Event listener for the submit button, which will display the score and highlight the correct answers when the button is clicked. Study the code in the function calculateScore() to help you.
      [DONE] 4. Reload the page when the reset button is clicked (hint: search window.location)
      [] 5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");

  var downloadTimer;

  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";

    var timeleft = 60;
    downloadTimer = setInterval(function countdown(){
      document.getElementById("time").innerHTML = timeleft + "&nbsp"+"seconds remaining";
      timeleft -= 1;
      if(timeleft <= 0){
      clearInterval(downloadTimer);
      document.getElementById("time").innerHTML = "Time is up!"
      }
    }, 1000);

  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia?",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which band released the hit song ‘Barbie Girl’ in 1997?",
      o: ["ABBA", "Aqua", "Venga Boys", "Cascada"],
      a: 1,
    },
    {
      q: "What is known as the powerhouse of the cell?",
      o: ["Nucleus", "Cytoplasm", "Membrane", "Mitochondria"],
      a: 3,
    }
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   <h4>Q - ${quizItem.q}</h4>
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {  
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

      
        if(radioElement.checked){
          if(quizItem.a == i){
          liElement.style.border = 'thick solid green';
          score++;
          }else{
            liElement.style.border = 'thick solid #db655c';
          }
        }
        
        radioElement.disabled = true;
      }
    }
  );

  const calculatedScore = document.querySelector('#calculatedScore');
  calculatedScore.innerHTML = `You got ${score} out of 5 questions correct`;
  scroll(0,0);
  
};

  // call the displayQuiz function
  displayQuiz();

  const quizTimeout = setTimeout(calculateScore, 62000);

  const submit = document.querySelector("#btnSubmit");
  submit.addEventListener("click", function (e) {
    calculateScore();
    clearInterval(downloadTimer);
    document.getElementById("time").innerHTML = "Your results:"

  })

  

});
