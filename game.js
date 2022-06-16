var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).on("keydown", startGame);
$(".btn").on("click", handleOnButtonClick);


function startGame() {
  if (!gameStarted) {
    gameStarted = !gameStarted;
    $("#level-title").text("Level 1");
    nextSequence();
  }
}

function nextSequence() {
  if(!gameStarted){
    return;
  }
  $("#level-title").text("Level " + ++level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  userClickedPattern = [];

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function handleOnButtonClick() {
  if (!gameStarted) {
    return;
  }
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  var isGoodAnswer = checkAnswer();

  if (isGoodAnswer) {
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    animatePress(userChosenColour);
    animateWrong();
    setGameOver();
  }
}

function checkAnswer() {
  return userClickedPattern.at(-1) == gamePattern[userClickedPattern.length - 1];
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => $("#" + currentColour).removeClass("pressed"), 100);
}

function animateWrong() {
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
}

function setGameOver() {
  var score = level;
  gameStarted = false;
  gamePattern = [];
  level = 0;
  $("#level-title").text("Game over! Press any key to restart. (Score :" + score + ")");
}

function playSound(name) {
  switch (name) {
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;

    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;

    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;

    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;

    default:
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

  }
}
