const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

// $("html").keydown(function () {
//   if (!gameStarted) {
//     gameStarted = true;
//     setTimeout(() => {
//       nextSequence();
//     }, 500);
//   }
// });

document.body.addEventListener("keydown", function () {
  if (!gameStarted) {
    gameStarted = true;
    setTimeout(() => {
      nextSequence();
    }, 500);
  }
});

// $("div[type=button]").click(function () {
//   if (gameStarted) {
//     const userChosenColour = $(this).attr("id");
//     userClickedPattern.push(userChosenColour);
//     playSound(userChosenColour);
//     animatePress(userChosenColour);
//     checkAnswer(userClickedPattern.length - 1);
//   }
// });

console.log(document.querySelectorAll("div[type=button]"));
document.querySelectorAll("div[type=button]").forEach(() => {
  this.addEventListener("click", function (event) {
    if (gameStarted) {
      // const userChosenColour = $(this).attr("id");
      console.log(event.target);
      const userChosenColour = event.target.getAttribute("id");
      console.log(userChosenColour);

      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    }
  });
});

function nextSequence() {
  level++;

  // $("#level-title").text("Level " + level);
  document.getElementById("level-title").innerHTML = "Level " + level;

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // let targetButton = $("#" + randomChosenColor);
  let targetButton = document.getElementById(randomChosenColor);
  console.log("animating sequence :: " + targetButton);

  playSound(randomChosenColor);
  // targetButton.fadeOut(100).fadeIn(100);
  targetButton.classList.add("hide");
  setTimeout(() => {
    targetButton.classList.replace("hide", "show");
  }, 100);
}

function playSound(name) {
  const soundsDir = "sounds/";
  const fileExtension = ".mp3";
  const audio = new Audio(soundsDir + name + fileExtension);
  audio.play();
}

function animatePress(currentColour) {
  // const target = $("#" + currentColour);
  const target = document.getElementById(currentColour);
  target.classList.add("pressed");
  setTimeout(() => {
    target.classList.remove("pressed");
  }, 100);
}

function checkAnswer(level) {
  if (userClickedPattern[level] === gamePattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern.length = 0;
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    // $("body").addClass("game-over");
    document.body.classList.add("game-over");
    setTimeout(() => {
      // $("body").removeClass("game-over");
      document.body.classList.remove("game-over");
    }, 500);

    $("#level-title").text(
      "Game Over, score: " +
        (gamePattern.length - 1) +
        ". Press any key to start again."
    );

    startOver();
  }
}

function startOver() {
  level = 0;
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  gameStarted = 0;
}
