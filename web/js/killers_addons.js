
const killer_addon_class = 'btn-killer-addon'
var killers_addons
var create_killer_addon_icon = (json) => {
    return create_icon_with_tooltip(json['description'], json['icon'])
}
var selected_killer_alias = null
const available_killers_addons = {null: []}
const enabled_killers_addons = {null: []}
const selected_killers_addons = {null: []}

function create_killers_addons_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src) {
    let button = create_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src, false)
    button.addEventListener('click', () => {
        update_roulette(button, json_info_list[selected_killer_alias], create_icon, enabled_list[selected_killer_alias], available_list[selected_killer_alias], selected_list[selected_killer_alias])
    })
    return button
}

async function load_killers_addons() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers_add-ons/killers_add-ons.json")
    .then((response) => response.json())
    .then(addons => {
        killers_addons = addons
        let killers_addons_modal = document.getElementById('modal-killers-addons-1-body')
        let addons_modal = document.getElementById('modal-killers-addons-2-body')
        for (let killer_index = 0; killer_index < killers_characters.length; killer_index++) {
            let killer_alias = killers_characters[killer_index]['alias']
            let character_btn = create_addons_option_select_button(killers_characters[killer_index], killer_alias, create_killer_character_icon, 'modal-killers-addons-2')

            available_killers_addons[killer_alias] = []
            enabled_killers_addons[killer_alias] = []
            selected_killers_addons[killer_alias] = []

            killers_addons_modal.appendChild(character_btn)

            let addons_container = create_addons_container(killer_alias)
            for (let addon_index = 0; addon_index < addons[killer_alias].length; addon_index++) {
                addons_container.appendChild(create_modal_selection_button(addon_index, addons[killer_alias][addon_index], 
                enabled_killers_addons[killer_alias], available_killers_addons[killer_alias], selected_killers_addons[killer_alias],
                create_killer_addon_icon, killer_addon_class))
            }
            addons_modal.appendChild(addons_container)
        }
        

        let killer_addon_roulette_container = document.getElementById("killers-addons-roulette")
        let killer_addon_roulette_1 = create_killers_addons_roulette_button(killers_addons, create_killer_addon_icon, enabled_killers_addons, available_killers_addons, selected_killers_addons, killer_addon_class, "imgs/addon-background.png")
        let killer_addon_roulette_2 = create_killers_addons_roulette_button(killers_addons, create_killer_addon_icon, enabled_killers_addons, available_killers_addons, selected_killers_addons, killer_addon_class, "imgs/addon-background.png")
        killers_roulette_buttons.push(killer_addon_roulette_1)
        killers_roulette_buttons.push(killer_addon_roulette_2)
        killer_addon_roulette_container.appendChild(killer_addon_roulette_1)
        killer_addon_roulette_container.appendChild(killer_addon_roulette_2)

        let btn_killer_roulette = document.getElementById('btn-killer-roulette')
        btn_killer_roulette.addEventListener('click', () => {
            let new_killer_alias = killers_characters[btn_killer_roulette.previous_index]['alias']

            if (selected_killer_alias !== null) {
                clear_addon_roulette_button(killer_addon_roulette_1, enabled_killers_addons[selected_killer_alias], available_killers_addons[selected_killer_alias], selected_killers_addons[selected_killer_alias], "imgs/addon-background.png")
                clear_addon_roulette_button(killer_addon_roulette_2, enabled_killers_addons[selected_killer_alias], available_killers_addons[selected_killer_alias], selected_killers_addons[selected_killer_alias], "imgs/addon-background.png")
            }
            selected_killer_alias = new_killer_alias
        })

    })
}