
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

console.log(getComputerChoice());
