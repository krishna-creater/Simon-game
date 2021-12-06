var gamePattern = [];
var userClickPattern = [];
var level = 0;

//generationg random color for all the button
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

$("body").keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  var ei = userClickPattern.length - 1;
  checkAnswer(ei);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

//genetation random ramdom 0-3
function nextSequence() {
  userClickPattern = [];
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  level += 1;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong Answer!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameOver();
  }
  console.log(userClickPattern);
  console.log(gamePattern);
}

function gameOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
