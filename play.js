let start = document.getElementById("start")
let multiplayer = document.getElementById("against-friend")
let against_computer = document.getElementById("against-computer")
let multiplayerContent = document.getElementById("multiplayer")
let singlePlayerContent = document.getElementById("computer")
localStorage.setItem("computerScore", '0')

start.addEventListener("click", function () {


    let name_exists = 0

    // check if cookie exists, if so deletes it
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('playerName=')).length) {
        document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    let playerName = document.getElementById("player-name").value

    if (playerName == "" || playerName == null) {
        document.getElementsByClassName("warning")[1].innerText = "Player's name is required"
    } else {

        document.cookie = `playerName=${playerName}`;

        if (localStorage.getItem("ranking")) {
            ranking = JSON.parse(localStorage.getItem("ranking"))
        } else {
            ranking = []
        }

        // se o nome ainda não existir na array
        for (const player of ranking) {
            if (player.name === playerName && name_exists != 1) {
                name_exists = 1;
            }
        }


        if (name_exists == 0) {
            // construir objeto
            const obj = {
                name: playerName,
                score: 0
            }
            ranking.push(obj)
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }

        if (document.getElementById("level").value == 'easy') {
            location.href = "easy-level.html"
        } else if (document.getElementById("level").value == 'medium') {
            location.href = "medium-level.html"
        } else {
            location.href = "hard-level.html"
        }
    }




});


document.getElementById("start-multiplayer").addEventListener("click", function () {

    let name1_exists = 0
    let name2_exists = 0

    // check if cookie exists, if so deletes it
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('playerOne=')).length) {
        document.cookie = "playerOne=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // check if cookie exists, if so deletes it
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('playerTwo=')).length) {
        document.cookie = "playerTwo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    let playerOneName = document.getElementById("player-one-name").value
    let playerTwoName = document.getElementById("player-two-name").value

    if (playerOneName == "" || playerOneName == null || playerTwoName == "" || playerTwoName == null) {
        document.getElementsByClassName("warning")[0].innerText = "Player's name is required"
    } else if (playerOneName == playerTwoName) {
        document.getElementsByClassName("warning")[0].innerText = "The players have to have different names"
    } else {
        document.cookie = `playerOne=${playerOneName}`;
        document.cookie = `playerTwo=${playerTwoName}`;

        if (localStorage.getItem("ranking")) {
            ranking = JSON.parse(localStorage.getItem("ranking"))
        } else {
            ranking = []
        }

        // se o nome ainda não existir na array
        for (const player of ranking) {
            if (player.name === playerOneName && name1_exists != 1) {
                name1_exists = 1;
            }

            if (player.name === playerTwoName && name2_exists != 1) {
                name2_exists = 1;
            }
        }

        if (name1_exists == 0) {
            // construir objeto
            const obj = {
                name: playerOneName,
                score: 0
            }
            ranking.push(obj)
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }

        if (name2_exists == 0) {
            // construir objeto
            const obj = {
                name: playerTwoName,
                score: 0
            }
            ranking.push(obj)
            localStorage.setItem("ranking", JSON.stringify(ranking))
        }

        location.href = "game.html"
    }


});


document.getElementById("against-friend").addEventListener("click", function () {
    multiplayer.style.display = "none";
    against_computer.style.display = "none";
    multiplayerContent.style.display = "inline";
    document.getElementById("start-multiplayer").style.display = "inline";
});

document.getElementById("against-computer").addEventListener("click", function () {
    multiplayer.style.display = "none";
    against_computer.style.display = "none";
    singlePlayerContent.style.display = "inline";
    start.style.display = "inline";
});