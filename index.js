
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
        message = "Looks like you've won!";
    } else if ( outcome === "tie" ) {
        message = "It's a tie!";
    } else {
        message = "Aw shucks, you lost!";
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
    let numRounds = 5;
    let pointsToWin = numRounds - Math.floor(numRounds / 2)
    let finished = false;
    let playerSelection;
    let outcome;
    let inputValid;

    while ( !finished ) {
        playerSelection = prompt("Do you play Rock, Paper or Scissors?") 
        inputValid = validateInput(playerSelection);
        if ( inputValid ) {
            outcome = playRound(playerSelection, getComputerChoice());

            // Print the round results
            console.log(outcome[0]);

            // Adjust scores and check for victory
            if ( outcome[1] === "win" ) {
                playerScore += 1;
                if ( playerScore == pointsToWin ) {
                    finished = true;
                    console.log("Congratulations! You've won! :)");
                }
            } else if ( outcome[1] === "lose" ) {
                computerScore += 1;
                if ( computerScore == pointsToWin ) {
                    finished = true;
                    console.log("Oh no! You've been defeated!");
                }
            }

            console.log(`Player: ${playerScore}   Computer: ${computerScore}`);
        } else {
            console.log("Invalid move specified");
        }
    }
}

// Start the game
game();
