const init = () =>{
    let randomNumber = Math.floor((Math.random() * 3) + 0);

    const answers = [
        'testea',
        'testeb',
        'testec'
    ];
    
    const themes = [
        'tema1',
        'tema2',
        'tema3',
    ];

    //CREATE RANDOM THEME
    themeBox = document.getElementById('themeBox');
    let themeContent = document.createTextNode(themes[randomNumber]);
    themeBox.appendChild(themeContent);

    //CREATE ANSWER AND ANSWER BOX
    let answer = answers[randomNumber];
    let answerArray = [];
    for(let i=0; i<answer.length; i++){
        answerArray[i] = '_';
    }

    canvas = document.getElementById('hangCanvas');
    let answerBoxContent = document.createTextNode(answerArray);
    canvas.appendChild(answerBoxContent);
 
    //CREATE THE ALPHABET BUTTONS
    buttonBox = document.getElementById('buttons');
    
    for(let i=97; i<123; i++){
        let button = document.createElement('input');
        let letter = String.fromCharCode(i);
        
        button.setAttribute('type', 'button');
        button.setAttribute('value', letter);
        button.setAttribute('class', 'btn btn-secondary btn-sm');
        button.addEventListener('click', function(){buttonClicked(letter, answer, answerArray, button)})
        buttonBox.appendChild(button);
    }

    //SET NUMBER OF LIVES TO 5
    let lives = document.getElementById('lives');
    lives.setAttribute('value', 5);
    let livesText = document.createTextNode('You have 5 lives!');
    lives.appendChild(livesText);
}

const buttonClicked = (letter, answer, answerArray, button) =>{
    let answerBox = document.getElementById('hangCanvas');
    let rightAnswer = 0;

    for(let i=0; i<answer.length; i++){
        if(letter == answer.charAt(i)){
            answerArray[i] = letter;
            answerBox.textContent = answerArray;
            rightAnswer++;
        }
    }

    //DISABLE BUTTON
    button.setAttribute('disabled', true);

    if(rightAnswer>0){
        gameOver(1) //hit = 1, the guess was correct
    }
    else{
        gameOver(0) //hit = 0, the guess was wrong
    }
}

const gameOver = (hit) =>{
    let lives =  document.getElementById('lives'); //lives element
    let livesCount = document.getElementById('lives').getAttribute('value'); //lives attribute

    if(hit==0){ //wrong guess = -1 live
        livesCount--;
    }
    
    lives.setAttribute("value", livesCount); //update liveCount
    lives.textContent = "You have " + livesCount + " lives!" //update lives text
    
    //if game is over
     if(livesCount == 0){
        let r = confirm("You have lost! Wanna play again?");
        if(r == true){
            location.reload(true); //refresh the page for next round
        }
        else{
            window.location="https://www.youtube.com/watch?v=jzS1AkFp_9E";
        }
    }
}




