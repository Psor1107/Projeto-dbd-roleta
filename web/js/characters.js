
const characters_class = "btn-character"
const characters_placeholder = "imgs/character-background.png"
var create_killer_character_icon = (json) => {
    let tooltip_text = `<h2 class='h5' style='text-align: center;'>${json['alias']}</h2><p>${json['overview']}</p>`
    return create_icon_with_tooltip(tooltip_text, json['icon'])
}
var create_survivor_character_icon = (json) => {
    let tooltip_text = `<h2 class='h5' style='text-align: center;'>${json['name']}</h2><p>${json['overview']}</p>`
    return create_icon_with_tooltip(tooltip_text, json['icon'])
}

var killers_characters
const available_killers_characters = []
const enabled_killers_characters = []
const selected_killers_characters = []

var survivors_characters
const available_survivors_characters = []
const enabled_survivors_characters = []
const selected_survivors_characters = []


fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers/killers.json")
.then((response) => response.json())
.then(perks => {
    killers_characters = perks
    let killer_modal = document.getElementById("modal-killers-characters-body")
    for (let i = 0; i < perks.length; i++) {
        killer_modal.appendChild(create_modal_selection_button(i, killers_characters[i], enabled_killers_characters, available_killers_characters, selected_killers_characters, create_killer_character_icon , characters_class))
    }

    let roulette_container = document.getElementById("killers-characters-roulette")
    roulette_container.appendChild(create_roulette_button(killers_characters, create_killer_character_icon, enabled_killers_characters, available_killers_characters, selected_killers_characters, characters_class, characters_placeholder))

    document.getElementById('btn-select-all-killers-characters').addEventListener("click", () => {
        select_all_modal_btn(killer_modal, enabled_killers_characters, available_killers_characters, selected_killers_characters, characters_class)
    })

    document.getElementById('btn-diselect-all-killers-characters').addEventListener('click', () => {
        diselect_all_modal_btn(killer_modal, enabled_killers_characters, available_killers_characters, characters_class)
    })
})


fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/survivors/survivors.json")
.then((response) => response.json())
.then(perks => {
    survivors_characters = perks
    let survivor_modal = document.getElementById("modal-survivors-characters-body")
    for (let i = 0; i < perks.length; i++) {
        survivor_modal.appendChild(create_modal_selection_button(i, survivors_characters[i], enabled_survivors_characters, available_survivors_characters, selected_survivors_characters, create_survivor_character_icon , characters_class))
    }

    let roulette_container = document.getElementById("survivors-characters-roulette")
    roulette_container.appendChild(create_roulette_button(survivors_characters, create_survivor_character_icon, enabled_survivors_characters, available_survivors_characters, selected_survivors_characters, characters_class, characters_placeholder))

    document.getElementById('btn-select-all-survivors-characters').addEventListener("click", () => {
        select_all_modal_btn(survivor_modal, enabled_survivors_characters, available_survivors_characters, selected_survivors_characters, characters_class)
    })

    document.getElementById('btn-diselect-all-survivors-characters').addEventListener('click', () => {
        diselect_all_modal_btn(survivor_modal, enabled_survivors_characters, available_survivors_characters, characters_class)
    })
})