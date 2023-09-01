
/**
 * Rock Paper Scissors
 *
 * @author Thomas Noel
 * @date 08/17/23
 */

/**
 * Computes the computer move
 */
function getComputerChoice() {
    let moves = ["Rock", "Paper", "Scissors"];
    let choice = Math.floor(Math.random() * moves.length);
    return moves[choice];
}

/**
 * Plays a round of rock, paper, scissors
 */
function playRound(playerSelection, computerSelection) {
    let ps = playerSelection.toLowerCase();
    let cs = computerSelection.toLowerCase();
    let outcome;
    let message;

    // Outer key is player move, inner key is computer move
    let gameRules = {
        rock: {
            rock: "tie",
            paper: "lose",
            scissors: "win"
        },
        paper: {
            rock: "win",
            paper: "tie",
            scissors: "lose"
        },
        scissors: {
            rock: "lose",
            paper: "win",
            scissors: "tie"
        } 
    };

    // Compute game outcome
    outcome = gameRules[ps][cs];

    // Generate report
    if ( outcome === "win" ) {
        message = "Looks like you've won this round!";
    } else if ( outcome === "tie" ) {
        message = "It's a tie!";
    } else {
        message = "Aw shucks, you lost this round!";
    }

    return [message, outcome];
}

function validateInput(playerSelection) {
    let ps = playerSelection.toLowerCase();
    return ps === "rock" || ps === "paper" || ps === "scissors";
}

/**
 * The rps game
 */
function game() {
  let playerScore = 0;
  let computerScore = 0;
  let pointsToWin = 5;
  let finished = false;
  let playerSelection;
  let computerSelection;
  let outcome;
  let inputValid;

  const buttons = document.querySelectorAll("button"); 
  const scoreElem = document.querySelector('.score');
  const compPlayElem = document.querySelector('.computer-choice');
  const outcomeElem = document.querySelector('.outcome');

  scoreElem.textContent = `Player: ${playerScore}   Computer: ${computerScore}`;
  outcomeElem.textContent = "Make a move to begin playing!";
  
  // Add listeners to each button that play a game round
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      playerSelection = button.textContent; 
      inputValid = validateInput(playerSelection);

      // Get the computer's move
      computerSelection = getComputerChoice();

      if (inputValid) {
        outcomeElem.textContent = "";
        compPlayElem.textContent = `The computer chose ${computerSelection}`;
        outcome = playRound(playerSelection, computerSelection);

        // Adjust scores and check for victory
        if ( outcome[1] === "win" ) {
          playerScore += 1;
          if ( playerScore == pointsToWin ) {
            finished = true;

            const congrats = document.createElement("h3");
            congrats.textContent = "Congratulations! You've won! :)"
            congrats.style.color = "green";
            outcomeElem.appendChild(congrats);

            buttons.forEach((button) => {
              button.disabled = true;
            });

            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        } else if ( outcome[1] === "lose" ) {
          computerScore += 1;
          if ( computerScore == pointsToWin ) {
            finished = true;

            const ohno = document.createElement("h3");
            ohno.textContent = "Oh no! You've been defeated!";
            ohno.style.color = "red";
            outcomeElem.appendChild(ohno);

            buttons.forEach((button) => {
              button.disabled = true;
            });

            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        }

        scoreElem.textContent = `Player: ${playerScore}   Computer: ${computerScore}`;

      } else {
        outcomeElem.textContent = "Invalid move specified";
      }
    });
  });
}

// Start the game
game();

