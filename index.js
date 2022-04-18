var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var userClickedPattern = []
var level = 0




function nextSequence(){
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //plays the sound for the presses and animates the press of the button
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  console.log(gamePattern);

  $("h1").text("Level " + level)
  level++
}

// This part of the code creates a function that makes the user press a key in order to
// interact with the game and let the audio play, as Chrome doesn't allow it
// also changes h1 and adds to it

// The .one("keydown", function() makes it so that it only works on first press)
$(document).one("keydown", function() {
    nextSequence();
  });

// adds clicked ids to a list of clicked pattern
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //plays the sound for the clicks and animates the press of the button
  playSound(userChosenColour);
  animatePress(userChosenColour);
  buttonCheck(userClickedPattern.length-1);
  console.log(userClickedPattern);
})


//Playsound function
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Adds animations to the User clicks
function animatePress(currentColor){
  var activeButton = $("." + currentColor)
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed");
  }, 100);
}


//Creates the game structure
function buttonCheck(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

// this part counts the amount of equal elements in the two arrays
    var count = 0
// this part makes sure that all elements in two arrays are equal
    for (var i = 0; i < gamePattern.length; i++){
        if (gamePattern[i] == userClickedPattern[i]){
            count++
        }
    }
// this part checks if the total elements are the same as the lenght of the
// computer selection and if so eliminates user pattern to repeat sequence
    if (count == gamePattern.length){
      userClickedPattern = []
      setTimeout(function(){
        nextSequence();
      }, 500);
    }
  }
//This part creates the game over sequence by adding a sound and changing the background - h1
  else{
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart!")
    $(document).one("keydown", function startOver(){
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      nextSequence()
    })
    }
}
