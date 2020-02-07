let used_boxes = 0; // Count how many boxes have been filled
let turns = 0; // See who's playing
let board = []; // Create the board
let ranking
let gameFineshed = 0
let playerName, playerScore
let playerOneCard = document.getElementsByClassName("player-one-card")[0]
let playerTwoCard = document.getElementsByClassName("player-two-card")[0]
let computerScore
let availableBoxes = ["0_0", "0_1", "0_2", "1_0", "1_1", "1_2", "2_0", "2_1", "2_2"]
let result

/* Create a multidimensional array. It sould look like this:

       ['0,0','0,1','0,2']
       ['1,0','1,1','1,2']
       ['2,0','2,1','2,2']

    */

board[0] = [0,0,0];
board[1] = [0,0,0];
board[2] = [0,0,0];

console.table(board);

computerScore = Number(localStorage.getItem("computerScore"))


playerData()

function playerData() {

    if (localStorage.getItem("ranking")) {
        ranking = JSON.parse(localStorage.getItem("ranking"))
    } else {
        ranking = []
    }

    for (const player of ranking) {
        if (document.cookie.split(';').filter((item) => item.includes(`playerName=${player.name}`)).length) {
            playerName = player.name
            playerScore = player.score
        }

    }

    document.getElementById("player-name").innerText = playerName
    document.getElementById("player-score").innerText = playerScore
    document.getElementById("computer-score").innerText = computerScore

}

function computerTurn() {

     result = blockPlay()
     
    if (result != undefined) {
        box = result;
    } else {
        box = availableBoxes[Math.floor(Math.random() * availableBoxes.length)]; // random of the available boxes

    }
    document.getElementById(box).style.pointerEvents = 'none'; // remove click attribute

    // takes the box off of the array
    for (var i = 0; i < availableBoxes.length; i++) {
        if (availableBoxes[i] === box) {
            availableBoxes.splice(i, 1);
            i--;
        }
    }
    document.getElementById(box).innerText = "O"
    document.getElementById(box).style.color = "#00cccc"

    used_boxes++;
    let position = box.split("_")

    board[position[0]][position[1]] = 5
    console.table(board);
    if (checkStatus()) {
        gameWon('o');
    }


}

function newMove(box) {
    turns += 1;

    /* ----- If turns is an even number than 'O' is playing -----

        * Removes the previous class and adds the player class (to change player card color)
        * Changes the text and color of box and adds the player symbol
        * Gets the id of the box (ex: 1_1 ) and splits it so you

    */

    // takes the box off of the array
    for (var i = 0; i < availableBoxes.length; i++) {
        if (availableBoxes[i] === box.id) {
            availableBoxes.splice(i, 1);
            i--;
        }
    }



    // If turns is an uneven number than 'X' is playing 
    if (turns % 2 != 0) {
        // Check if the spot is empty
        if (box.innerHTML === "") {
            used_boxes++;
            box.innerText = "X"
            box.style.color = "#ff7f7f"
            let position = box.id.split("_")

            board[position[0]][position[1]] = 1
            console.table(board);
            document.getElementById(box.id).style.pointerEvents = 'none'; // remove click attribute

            if (checkStatus()) {
                gameFineshed = 1
                gameWon('x');
            }
        }
        turns += 1
    }
    if (turns % 2 == 0 && gameFineshed == 0) {
        computerTurn()
    }
}


function blockPlay() {

    for (let rows = 0; rows < board.length; rows++) {

        let diagonal_top_left = board[0][0] + board[1][1] + board[2][2]; // diagonal top left to bottom right
        let diagonal_top_right = board[0][2] + board[1][1] + board[2][0]; // diagonal top right bottom left

        // columms
        let column1 = board[0][0] + board[1][0] + board[2][0];
        let column2 = board[0][1] + board[1][1] + board[2][1];
        let column3 = board[0][2] + board[1][2] + board[2][2];

        // row
        let row1 = board[0][0] + board[0][1] + board[0][2];
        let row2 = board[1][0] + board[1][1] + board[1][2];
        let row3 = board[2][0] + board[2][1] + board[2][2];

        if (diagonal_top_left == 2) {
            if (board[0][0] == 0) {
                return '0_0'
            }
            if (board[2][2] == 0) {
                return '2_2'
            }
            if (board[1][1] == 0) {
                return '1_1'
            }
        }
        if (diagonal_top_right == 2) {
            if (board[0][2] == 0) {
                return '0_2'
            }
            if (board[1][1] == 0) {
                return '1_1'
            }
            if (board[2][0] == 0) {
                return '2_0'
            }
        }

        if (column1 == 2) {
            if (board[0][0] == 0) {
                return '0_0'
            }
            if (board[1][0] == 0) {
                return '1_0'
            }
            if (board[2][0] == 0) {
                return '2_0'
            }
        }

        if (column2 == 2) {
            if (board[0][1] == 0) {
                return '0_1'
            }
            if (board[1][1] == 0) {
                return '1_1'
            }
            if (board[2][1] == 0) {
                return '2_1'
            }
        }

        if (column3 == 2) {
            if (board[0][2] == 0) {
                return '0_2'
            }
            if (board[1][2] == 0) {
                return '1_2'
            }
            if (board[2][2] == 0) {
                return '2_2'
            }
        }

        if (row1 == 2) {
            if (board[0][0] == 0) {
                return '0_0'
            }
            if (board[0][1] == 0) {
                return '0_1'
            }
            if (board[0][2] == 0) {
                return '0_2'
            }
        }

        if (row2 == 2) {
            if (board[1][0] == 0) {
                return '1_0'
            }
            if (board[1][1] == 0) {
                return '1_1'
            }
            if (board[1][2] == 0) {
                return '1_2'
            }
        }

        if (row3 == 2) {
            if (board[2][0] == 0) {
                return '2_0'
            }
            if (board[2][1] == 0) {
                return '2_1'
            }
            if (board[2][2] == 0) {
                return '2_2'
            }
        }
    }

    return; // return nothing if there is no almost wins
}

// Check to see if player has won
function checkStatus() {

    for (var rows = 0; rows < board.length; rows++) {
        var row_total = 0;
        var column_total = 0;

        for (var columns = 0; columns < board[rows].length; columns++) {
            row_total += board[rows][columns];
            column_total += board[columns][rows];

        }

        // Winning combination for diagonal scenario [0,4,8], [2,4,6]
        var diagonal_top_left = board[0][0] + board[1][1] + board[2][2]; // diagonal top left to bottom right
        var diagonal_top_right = board[0][2] + board[1][1] + board[2][0]; // diagonal top right bottom left

        // If combination is true returns true. 
        // 0- checks the X player since 0 + 0 + 0 = 0
        // 3- checks the O player since 1 + 1 + 1 = 3

        if (diagonal_top_left == 15 || diagonal_top_left == 3) {

            return true;
        }

        if (diagonal_top_right == 15 || diagonal_top_right == 3) {

            return true;
        }

        // Winning combination for row [0,1,2], [3,4,5], [6,7,8]
        // Winning combination for column [0,3,6], [1,4,7], [2,5,8]
        // 0- checks the X player since 0 + 0 + 0 = 0
        // 3- checks the O player since 1 + 1 + 1 = 3
        if (row_total == 15 || column_total == 15 || row_total == 3 || column_total == 3) {
            return true;
        }

        // if all boxes are full then it's a draw!!!
        if (used_boxes == 9) {
            gameDraw();
        }
    }
}


function gameWon(player) {

    // show game won message
    if (player == "x") {
        Swal.fire({
            icon: 'error',
            title: `Congrats! You won this match`,
            text: '',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
            }

        })
        playerScore += 1
        computerScore -= 1

    } else if (player == "o") {
        Swal.fire({
            icon: 'info',
            iconHtml: ' ',
            title: `You lost. Better luck next time!`,
            text: '',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        playerScore -= 1
        computerScore += 1
    }
    updateScore()
}


// Tells user when game is a draw.
var gameDraw = function () {
    Swal.fire({
        icon: 'question',
        iconHtml: '<i class="far fa-handshake"></i>',
        title: "It's a draw",
        text: '',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading()
        }
    })
    resetGame();
}

function resetGame() {
    playerData()
    setTimeout(function () {
        location.reload();
    }, 1980);
}

function updateScore() {

    for (const player of ranking) {
        if (player.name == playerName) {
            player.score = playerScore
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }

    }
    localStorage.setItem("computerScore", String(computerScore))
    document.getElementById("computer-score").innerText = computerScore
    document.getElementById("player-score").innerText = playerScore
    resetGame()
}