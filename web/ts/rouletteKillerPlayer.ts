import getRandomItem from "./functions/getRandomItem.js"


document.addEventListener('DOMContentLoaded', () => {
    let select_killer_btn = document.getElementById('btn-select-player-killer') as HTMLElement
    select_killer_btn.addEventListener('click', () => {
        let player1_name = (document.getElementById('player1_name') as HTMLInputElement).value.trim()
        let player2_name = (document.getElementById('player2_name') as HTMLInputElement).value.trim()
        let player3_name = (document.getElementById('player3_name') as HTMLInputElement).value.trim()
        let player4_name = (document.getElementById('player4_name') as HTMLInputElement).value.trim()
        let player5_name = (document.getElementById('player5_name') as HTMLInputElement).value.trim()

        let players_list = []

        if (player1_name !== '') {
            players_list.push(player1_name)
        }
        if (player2_name !== '') {
            players_list.push(player2_name)
        }
        if (player3_name !== '') {
            players_list.push(player3_name)
        }
        if (player4_name !== '') {
            players_list.push(player4_name)
        }
        if (player5_name !== '') {
            players_list.push(player5_name)
        }

        let selected_player_killer = document.getElementById('selected-player-killer') as HTMLElement
        if (players_list.length === 0) {
            selected_player_killer.innerText = 'Nenhum jogador '
        } else {
            selected_player_killer.innerText = getRandomItem(players_list)
        }
    })
})