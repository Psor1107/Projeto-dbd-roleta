
const killer_addon_class = 'btn-killer-addon'
var killers_addons
var create_killer_addon_icon = (json) => {
    return create_icon_with_tooltip(json['description'], json['icon'])
}
var selected_killer_alias = null
const available_killers_addons = {null: []}
const enabled_killers_addons = {null: []}
const selected_killers_addons = {null: []}


function show_killer_addons(killer_alias) {
    let addons_modal = document.getElementById("modal-killers-addons-2-body")
    for (let killer_addon_container of addons_modal.children) {
        killer_addon_container.style.display = 'none'
    }
    document.getElementById(`${killer_alias}-addons_container`).style.display = 'flex'
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

function create_killers_addons_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src) {
    let button = create_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src, false)
    button.addEventListener('click', (event) => {
        update_roulette(event, json_info_list[selected_killer_alias], create_icon, enabled_list[selected_killer_alias], available_list[selected_killer_alias], selected_list[selected_killer_alias])
    })
    return button
}

function clear_addon_roulette_button(btn_addon, enabled_list, available_list, selected_list, placeholder_icon_src) {
    if (btn_addon.children[0].tooltip)
        btn_addon.children[0].tooltip.dispose()
    btn_addon.children[0].remove()

    if (btn_addon.previous_index !== undefined) {
        if (enabled_list.indexOf(btn_addon.previous_index) !== -1) {
            available_list.push(btn_addon.previous_index)
        }
        removeItem(selected_list, btn_addon.previous_index)
    }

    let img = document.createElement('img')
    img.className = 'img-fluid'
    img.src = placeholder_icon_src
    btn_addon.appendChild(img)
    
    btn_addon.previous_index = undefined
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
            let character_btn = create_character_btn(killers_characters[killer_index])

            available_killers_addons[killer_alias] = []
            enabled_killers_addons[killer_alias] = []
            selected_killers_addons[killer_alias] = []

            killers_addons_modal.appendChild(character_btn)

            let addons_container = create_killer_addons_container(killer_alias)
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
        killer_addon_roulette_container.appendChild(killer_addon_roulette_1)
        killer_addon_roulette_container.appendChild(killer_addon_roulette_2)

        let btn_killer_roulette = document.getElementById('btn-killer-roulette')
        btn_killer_roulette.addEventListener('click', (event) => {
            let new_killer_alias = killers_characters[btn_killer_roulette.previous_index]['alias']
            console.log(new_killer_alias)

            if (selected_killer_alias !== null) {
                clear_addon_roulette_button(killer_addon_roulette_1, enabled_killers_addons[selected_killer_alias], available_killers_addons[selected_killer_alias], selected_killers_addons[selected_killer_alias], "imgs/addon-background.png")
                clear_addon_roulette_button(killer_addon_roulette_2, enabled_killers_addons[selected_killer_alias], available_killers_addons[selected_killer_alias], selected_killers_addons[selected_killer_alias], "imgs/addon-background.png")
            }
            selected_killer_alias = new_killer_alias
        })

    })
}