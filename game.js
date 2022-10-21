
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

// When the game starts
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})

// The animation that appears when a button gets pressed
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

// Play the respective sound 
function playSounds(randomColor) {
    var audioFile = "sounds/"+randomColor+".mp3";
    var audio = new Audio(audioFile);
    audio.play();
}

//Checks whether the user clicked pattern is correct or not.
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSounds("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over...Start Over Again by Pressing Any Key!")
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 1000);
        startOver();
    }
}

//Generates the next sequence 
function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level "+ level)
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+randomChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+randomChosenColor).removeClass("pressed");
    }, 100);
    
    playSounds(randomChosenColor);
}

// The response when a button is clicked
$(".btn").click(function(event){

    userChosenColor = this.id;

    playSounds(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

// Restart function
function startOver(){
    level = 1;
    gamePattern = [];
    started = false;
}


