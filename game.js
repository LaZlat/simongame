var buttonsColors = ["red", "blue", "yellow", "green"];
var trackerArr = [];
var pressedArr = [];
var gameTracker = false;
var gameOver = false;
var firstGame = true;
var iter = 1;
var audio = new Audio("sounds/Rymdreglage.mp3")

$(".start").click(function() {
  $(".start").toggle("pressed");
  setTimeout(function() {
    $(".start").toggle("pressed"),100
  });
  audio.play();
  audio.loop = true;

})

$(".end").click(function() {
  $(".end").toggle("pressed");
  setTimeout(function() {
    $(".end").toggle("pressed"),100
  });
  audio.pause();
  audio.loop = false;
  audio.currentTime = 0;
})

$(document).keypress(function(event) {
  if (firstGame) {
    $("h1").text("Do as Simon says!");
    $("h3").text("Level " + iter);
    firstGame = false;
  }
  if (gameTracker) {
    switch (event.key) {
      case "w":
        pressedArr.push("red");
        break;
      case "q":
        pressedArr.push("green");
        break;
      case "a":
        pressedArr.push("yellow");
        break;
      case "s":
        pressedArr.push("blue");
        break;
      default:
        break;
    }

    if (pressedArr.length == iter) {

      if (!areEqual()) {
        pressedArr = [];
        trackerArr = [];
        iter++;
        $("h3").text("Level " + iter);
        gameStart();
      } else {
        pressedArr = [];
        trackerArr = [];
        $(document).off('keypress');
        $("h1").text("Game Over");
        audio.pause();
        audio.currentTime = 0;

        audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $(document.body).css("background-color","red");
        gameTracker = false;
        gameOver = false;
        firstGame = true;
        iter = 1;
      }
    }
  } else {
    gameTracker = true;
    gameStart();
  }
});

function nextSeq() {
  return Math.floor(Math.random() * 4);
}

function areEqual() {
  var gameOver = false;

  trackerArr.sort();
  pressedArr.sort();

  for (var j = 0; j < trackerArr.length; j++) {
    if (trackerArr[j] != pressedArr[j]) {
      gameOver = true;
      break;
    }
  }
  return gameOver;
}

function gameStart() {
  for (var i = 0; i < iter; i++) {
    var btn;

    setTimeout(function() {
      btn = buttonsColors[nextSeq()];
      $("." + btn).toggle("pressed");
      trackerArr.push(btn);
    }, 100);

    setTimeout(function() {
      $("." + btn).toggle("pressed");
    }, 100);
  }
}
