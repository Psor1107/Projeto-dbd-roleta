
const survivor_addon_class = 'btn-survivor-addon'
var survivors_addons
var create_survivor_addon_icon = (json) => {
    return create_icon_with_tooltip(json['description'], json['icon'])
}
var selected_item_type = null
const available_survivors_addons = {null: []}
const enabled_survivors_addons = {null: []}
const selected_survivors_addons = {null: []}

function create_survivors_addons_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src) {
    let button = create_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src, false)
    button.addEventListener('click', () => {
        update_roulette(button, json_info_list[selected_item_type], create_icon, enabled_list[selected_item_type], available_list[selected_item_type], selected_list[selected_item_type])
    })
    return button
}


async function load_survivors_addons() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/items_add-ons/items_add-ons.json")
    .then((response) => response.json())
    .then(addons => {
        survivors_addons = addons
        let survivors_addons_modal = document.getElementById('modal-survivors-addons-1-body')
        let addons_modal = document.getElementById('modal-survivors-addons-2-body')
        let main_items_names = ['Flashlight', 'Skeleton Key', 'Map', 'First Aid Kit', 'Toolbox']
        for (let item_index = 0; item_index < items.length; item_index++) {
            if (main_items_names.indexOf(items[item_index]['name']) !== -1) {
                let item_type = items[item_index]['type']

                let item_btn = create_addons_option_select_button(items[item_index], item_type, create_item_icon, 'modal-survivors-addons-2')

                available_survivors_addons[item_type] = []
                enabled_survivors_addons[item_type] = []
                selected_survivors_addons[item_type] = []

                survivors_addons_modal.appendChild(item_btn)

                let addons_container = create_addons_container(item_type)
                for (let addon_index = 0; addon_index < addons[item_type].length; addon_index++) {
                    addons_container.appendChild(create_modal_selection_button(addon_index, addons[item_type][addon_index], 
                    enabled_survivors_addons[item_type], available_survivors_addons[item_type], selected_survivors_addons[item_type],
                    create_killer_addon_icon, killer_addon_class))
                }
                addons_modal.appendChild(addons_container)
            }
        }
        

        let survivor_addons_roulette_container = document.getElementById("survivors-addons-roulette")
        let survivor_addon_roulette_1 = create_survivors_addons_roulette_button(survivors_addons, create_survivor_addon_icon, enabled_survivors_addons, available_survivors_addons, selected_survivors_addons, survivor_addon_class, "imgs/addon-background.png")
        let survivor_addon_roulette_2 = create_survivors_addons_roulette_button(survivors_addons, create_survivor_addon_icon, enabled_survivors_addons, available_survivors_addons, selected_survivors_addons, survivor_addon_class, "imgs/addon-background.png")   
        survivors_roulette_buttons.push(survivor_addon_roulette_1)
        survivors_roulette_buttons.push(survivor_addon_roulette_2)
        survivor_addons_roulette_container.appendChild(survivor_addon_roulette_1)
        survivor_addons_roulette_container.appendChild(survivor_addon_roulette_2)

        let btn_item_roulette = document.getElementById('btn-items-roulette')
        btn_item_roulette.addEventListener('click', () => {
            let new_item_type = items[btn_item_roulette.previous_index]['type']

            if (selected_item_type !== null && selected_item_type !== new_item_type) {
                clear_addon_roulette_button(survivor_addon_roulette_1, enabled_survivors_addons[selected_item_type], available_survivors_addons[selected_item_type], selected_survivors_addons[selected_item_type], "imgs/addon-background.png")
                clear_addon_roulette_button(survivor_addon_roulette_2, enabled_survivors_addons[selected_item_type], available_survivors_addons[selected_item_type], selected_survivors_addons[selected_item_type], "imgs/addon-background.png")
            }
            if (new_item_type !== 'Firecracker')
                selected_item_type = new_item_type
            else
                selected_item_type = null
        })

    })
}