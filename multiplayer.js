let symbol = "";
let playerOneCard = document.getElementsByClassName("player-one-card")[0]
let playerTwoCard = document.getElementsByClassName("player-two-card")[0]
let used_boxes = 0; // Count how many boxes have been filled
let turns = 0; // See who's playing
let board = []; // Create the board
let ranking

let playerOneName, playerTwoName, playerOneScore, playerTwoScore

/* Create a multidimensional array. It sould look like this:

       ['0,0','0,1','0,2']
       ['1,0','1,1','1,2']
       ['2,0','2,1','2,2']

    */

board[0] = new Array(3);
board[1] = new Array(3);
board[2] = new Array(3);

playersData() // retrive the players name and score

function playersData() {

    if (localStorage.getItem("ranking")) {
        ranking = JSON.parse(localStorage.getItem("ranking"))
    } else {
        ranking = []
    }

    for (const player of ranking) {
        if (document.cookie.split(';').filter((item) => item.includes(`playerOne=${player.name}`)).length) {
            playerOneName = player.name
            playerOneScore = player.score
        }

        if (document.cookie.split(';').filter((item) => item.includes(`playerTwo=${player.name}`)).length) {
            playerTwoName = player.name
            playerTwoScore = player.score
        }
    }

    document.getElementById("player-one-name").innerText = playerOneName
    document.getElementById("player-two-name").innerText = playerTwoName
    document.getElementById("player-one-score").innerText = playerOneScore
    document.getElementById("player-two-score").innerText = playerTwoScore

}


function newMove(box) {
    turns++;

    let position = box.id.split("_")
    board[position[0]][position[1]]

    if (turns == 2) {
        let pos1 = Math.floor(Math.random() * 2) + 1;
        let pos2 = Math.floor(Math.random() * 2) + 1;
        board[pos1][pos2] = 'block'
        console.log(pos1, pos2);

    }


    /* ----- If turns is an even number than 'O' is playing -----
    
        * Removes the previous class and adds the player class (to change player card color)
        * Changes the text and color of box and adds the player symbol
        * Gets the id of the box (ex: 1_1 ) and splits it so you
    
    
    */
    if (board[position[0]][position[1]] == 'block') {

        if (turns % 2 == 0) {
            used_boxes++;
            playerOneCard.classList.add("player-one-playing");
            box.innerHTML = "O"
            box.style.color = "#00cccc"
            board[position[0]][position[1]] = 1
        } else {
            used_boxes++;
            playerTwoCard.classList.add("player-two-playing");
            box.innerText = "X"
            box.style.color = "#ff7f7f"
            board[position[0]][position[1]] = 0
        }

        Swal.fire({
            icon: 'question',
            iconHtml: '<i class="fas fa-ban"></i>',
            title: "You found the block item",
            text: "Your oponent just lost it's time! It's your time to shine"
        })

        turns++
        return
    }
    if (turns % 2 == 0 && board[position[0]][position[1]] != 'block') {
        playerTwoCard.classList.remove("player-two-playing");
        if (box.innerHTML === "") {
            used_boxes++;
            playerOneCard.classList.add("player-one-playing");
            box.innerHTML = "O"
            box.style.color = "#00cccc"
            let position = box.id.split("_")
            board[position[0]][position[1]] = 1
            document.getElementById(box.id).style.pointerEvents = 'none'; // remove click attribute- .removeAttribute("click")
            if (checkStatus()) {
                gameWon('o');
            }
        }
    }
    // If turns is an uneven number than 'X' is playing 
    else if (turns % 2 != 0 && board[position[0]][position[1]] != 'block') {
        playerOneCard.classList.remove("player-one-playing");
        // Check if the spot is empty
        if (box.innerHTML === "") {
            used_boxes++;
            playerTwoCard.classList.add("player-two-playing");
            box.innerText = "X"
            box.style.color = "#ff7f7f"
            let position = box.id.split("_")

            board[position[0]][position[1]] = 0
            document.getElementById(box.id).style.pointerEvents = 'none'; // remove click attribute
            if (checkStatus()) {
                gameWon('x');
            }
        }
    }
}




// Check to see if player has won
function checkStatus() {

    for (var rows = 0; rows < board.length; rows++) {
        var row_total = 0;
        var column_total = 0;

        /* ???? */
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

        if (diagonal_top_left == 0 || diagonal_top_left == 3) {

            return true;
        }

        if (diagonal_top_right == 0 || diagonal_top_right == 3) {

            return true;
        }

        // Winning combination for row [0,1,2], [3,4,5], [6,7,8]
        // Winning combination for column [0,3,6], [1,4,7], [2,5,8]
        // 0- checks the X player since 0 + 0 + 0 = 0
        // 3- checks the O player since 1 + 1 + 1 = 3
        if (row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
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
    if (player === "x") {
        Swal.fire({
            icon: 'error',
            title: `And the winner is... ${playerOneName}`,
            text: '',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
            }

        })

        playerOneScore += 1
        playerTwoScore -= 1

    } else if (player === "o") {
        Swal.fire({
            icon: 'info',
            iconHtml: ' ',
            title: `And the winner is... ${playerTwoName}`,
            text: '',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        playerOneScore -= 1
        playerTwoScore += 1
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
    playersData()
    setTimeout(function () {
        location.reload();
    }, 1980);
}

function updateScore() {
    for (const player of ranking) {
        if (player.name == playerOneName) {

            player.score = playerOneScore
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }
        if (player.name == playerTwoName) {

            player.score = playerTwoScore
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }
    }

    document.getElementById("player-one-score").innerText = playerOneScore
    document.getElementById("player-two-score").innerText = playerTwoScore
    resetGame()
}