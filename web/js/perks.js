
const perks_class = "btn-perk"
const perks_placeholder = "imgs/perk-background.png"
var create_perk_icon = (json) => (create_icon_with_tooltip(json['description'], json['icon']))

var killers_perks
const available_killers_perks = []
const enabled_killers_perks = []
const selected_killers_perks = []

var survivors_perks
const available_survivors_perks = []
const enabled_survivors_perks = []
const selected_survivors_perks = []




fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
.then((response) => response.json())
.then(perks => {
    killers_perks = perks
    let killer_modal = document.getElementById("modal-killers-perks-body")
    for (let i = 0; i < perks.length; i++) {
        killer_modal.appendChild(create_modal_selection_button(i, killers_perks[i], enabled_killers_perks, available_killers_perks, selected_killers_perks, create_perk_icon , perks_class))
    }

    let roulette_container = document.getElementById("killers-perks-roulette")
    for (let i = 0; i < 4; i++) {
        let roulette_button_box = document.createElement('div')
        roulette_button_box.className = 'col'
        roulette_button_box.appendChild(create_roulette_button(killers_perks, create_perk_icon, enabled_killers_perks, available_killers_perks,  selected_killers_perks, perks_class, perks_placeholder))
        roulette_container.appendChild(roulette_button_box)
    }

    document.getElementById('btn-select-all-killers-perks').addEventListener("click", () => {
        select_all_modal_btn(killer_modal, enabled_killers_perks, available_killers_perks, selected_killers_perks, perks_class)
    })

    document.getElementById('btn-diselect-all-killers-perks').addEventListener('click', () => {
        diselect_all_modal_btn(killer_modal, enabled_killers_perks, available_killers_perks, perks_class)
    })

    document.getElementById('btn-roullete-killers-perks').addEventListener('click', () => {
        for (let perk_box of roulette_container.children) {
            let perk_button = perk_box.children[0].children[0]
            perk_button.click()
        }
    })
})

fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
.then((response) => response.json())
.then(perks => {
    survivors_perks = perks
    let survivors_modal = document.getElementById("modal-survivors-perks-body")
    for (let i = 0; i < perks.length; i++) {
        survivors_modal.appendChild(create_modal_selection_button(i, survivors_perks[i], enabled_survivors_perks, available_survivors_perks, selected_survivors_perks, create_perk_icon, perks_class))
    }

    let roulette_container = document.getElementById("survivors-perks-roulette")
    for (let i = 0; i < 4; i++) {
        let roulette_button_box = document.createElement('div')
        roulette_button_box.className = 'col'
        roulette_button_box.appendChild(create_roulette_button(survivors_perks, create_perk_icon, enabled_survivors_perks, available_survivors_perks, selected_survivors_perks, perks_class, perks_placeholder))
        roulette_container.appendChild(roulette_button_box)
    }

    document.getElementById('btn-select-all-survivors-perks').addEventListener("click", () => {
        select_all_modal_btn(survivors_modal, enabled_survivors_perks, available_survivors_perks, selected_survivors_perks, perks_class)
    })

    document.getElementById('btn-diselect-all-survivors-perks').addEventListener("click", () => {
        diselect_all_modal_btn(survivors_modal, enabled_survivors_perks, available_survivors_perks, perks_class)
    })

    document.getElementById('btn-roullete-survivors-perks').addEventListener('click', () => {
        for (let perk_box of roulette_container.children) {
            let perk_button = perk_box.children[0].children[0]
            perk_button.click()
        }
    })
})
