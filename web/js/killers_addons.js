
var killers_addons
var create_killer_addon_icon = (json) => {
    return create_icon_with_tooltip(json['description'], json['icon'])
}
const available_killers_addons = {}
const enabled_killers_addons = {}
const selected_killers_addons = {}


function show_killer_addons(killer_alias) {
    let addons_modal = document.getElementById("modal-killers-addons-2-body")
    for (let killer_addon_container of addons_modal.children) {
        killer_addon_container.style.display = 'none'
    }
    document.getElementById(`${killer_alias}-addons_container`).style.display = 'block'
}

function create_character_btn(killer_json) {
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let icon = create_killer_character_icon(killer_json)

    let button = document.createElement('button')
    button.className = 'bg-dark btn-selection-modal'
    button.dataset.bsTarget = "#modal-killers-addons-2"
    button.dataset.bsToggle = "modal"
    button.dataset.bsDismiss = "modal"
    button.killer_target = killer_json['alias']
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        show_killer_addons(btn.killer_target)
    })

    button.appendChild(icon)
    button_box.appendChild(button)
    return button_box
}

function create_killer_addons_container(killer_alias) {
    let addons_container = document.createElement('div')
    addons_container.className = 'row row-cols-3 row-cols-md-4 row-cols-lg-6 gy-4'
    addons_container.id = `${killer_alias}-addons_container`
    return addons_container
}

async function load_killers_addons() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers_add-ons/killers_add-ons.json")
    .then((response) => response.json())
    .then(addons => {
        killers_addons = addons
        let killers_addons_modal = document.getElementById('modal-killers-addons-1-body')
        for (let killer_index = 0; killer_index < killers_characters.length; killer_index++) {
            let killer_alias = killers_characters[killer_index]['alias']
            let character_btn = create_character_btn(killers_characters[killer_index])

            available_killers_addons[killer_alias] = []
            enabled_killers_addons[killer_alias] = []
            selected_killers_addons[killer_alias] = []

            killers_addons_modal.appendChild(character_btn)

            let addons_container = create_killer_addons_container(killer_alias)
            for (let addon_index = 0; addon_index < addons[killer_alias].length; addon_index++) {
                addons_container.appendChild(create_modal_selection_button(addon_index, addons[killer_alias][addon_index], 
                enabled_killers_addons[killer_alias], available_killers_addons[killer_alias], selected_killers_addons[killer_alias],
                create_killer_addon_icon, ''))
            }
        }
    })
}