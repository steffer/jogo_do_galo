
    if (localStorage.getItem("ranking")) {
        ranking = JSON.parse(localStorage.getItem("ranking"))
    } else {
        ranking = []
    }

    ranking.sort(function (s1, s2) {
        if (s1.score > s2.score) return -1
        if (s1.score < s2.score) return 1
        else return 0
    })
    
    let table = "<table>"
    for (const player of ranking) {
        table += `<tr>
        <td>${player.name}</td>
        <td>${player.score}</td>
        
        </tr>`
    }
    table += "</table>"

    document.getElementById("divTable").innerHTML = table