

function clearTooltips() {
    document.querySelectorAll('.tooltip').forEach((item) => {
        item.remove()
    })
}

function create_icon_with_tooltip(tooltip_description, icon_src) {
    let icon = document.createElement('img')
    icon.className = 'img-fluid'
    icon.dataset.bsToggle = "tooltip"
    icon.dataset.bsPlacement = "top"
    icon.dataset.bsHtml = "true"
    icon.title = tooltip_description
    icon.src = icon_src
    icon.draggable = false
    // icon.tooltip = new bootstrap.Tooltip(icon)
    return icon
}

function select_modal_btn(modal_btn, enabled_list, available_list, selected_list, btn_class) {
    modal_btn.enabled = true
    enabled_list.push(modal_btn.index)
    if (selected_list.indexOf(modal_btn.index) == -1) {
        available_list.push(modal_btn.index)
    }
    modal_btn.className = modal_btn.className.replace(` ${btn_class}-disabled`, ` ${btn_class}-enabled`)
}

function diselect_modal_btn(modal_btn, enabled_list, available_list, btn_class) {
    modal_btn.enabled = false
    removeItem(enabled_list, modal_btn.index)
    removeItem(available_list, modal_btn.index)
    modal_btn.className = modal_btn.className.replace(` ${btn_class}-enabled`, ` ${btn_class}-disabled`)
}

function create_modal_selection_button(element_index, element_info_json, enabled_list, available_list, selected_list, 
    create_icon, btn_class) {
    
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let button = document.createElement('button')
    button.className = `bg-dark btn-selection-modal ${btn_class}-hover ${btn_class}-enabled`
    button.index = element_index
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        if (btn.enabled) {
            diselect_modal_btn(btn, enabled_list, available_list, btn_class)
        } else {
            select_modal_btn(btn, enabled_list, available_list, selected_list, btn_class)
        }
    })
    select_modal_btn(button, enabled_list, available_list, selected_list, btn_class)
    
    let perk_img = create_icon(element_info_json)
    
    button_box.appendChild(button)
    button.appendChild(perk_img)
    return button_box
}


function create_roulette_button(json_info_list, create_icon, enabled_list, available_list, selected_list, btn_class, placeholder_icon_src, add_update=true) {
    let button = document.createElement('button')
    button.className = `btn-selection-modal ${btn_class}-roulette`
    if (add_update) {
        button.addEventListener('click', () => {
            update_roulette(button, json_info_list, create_icon, enabled_list, available_list, selected_list)
        })
    }
    let img = document.createElement('img')
    img.className = 'img-fluid'
    img.src = placeholder_icon_src

    button.appendChild(img)
    return button
}

function update_roulette(btn_roulette, json_info_list, create_icon, enabled_list, available_list, selected_list) {
    if (available_list.length == 0) {
        return
    }
    let selected_index = random_item(available_list)
    let selected_json = json_info_list[selected_index]
    clearTooltips()
    
    const img = create_icon(selected_json)
    img.classList.add('roulette-tooltip')
    btn_roulette.appendChild(img)
    btn_roulette.children[0].remove()

    if (btn_roulette.previous_index !== undefined) {
        if (enabled_list.indexOf(btn_roulette.previous_index) != -1)
            available_list.push(btn_roulette.previous_index)
        removeItem(selected_list, btn_roulette.previous_index)
    }

    btn_roulette.previous_index = selected_index
    removeItem(available_list, selected_index)
    selected_list.push(selected_index)
}

function select_all_modal_btn(modal, enabled_list, available_list, selected_list, btn_class) {
    for (let perk_box of modal.children) {
        let perk_button = perk_box.children[0]
        if (!perk_button.enabled) {
            select_modal_btn(perk_button, enabled_list, available_list, selected_list, btn_class)
        }
    }
}

function diselect_all_modal_btn(modal, enabled_list, available_list, btn_class) {
    for (let perk_box of modal.children) {
        let perk_button = perk_box.children[0]
        if (perk_button.enabled) {
            diselect_modal_btn(perk_button, enabled_list, available_list, btn_class)
        }
    }
}


function show_addons(alias, addons_modal) {
    for (let addon_container of addons_modal.children) {
        addon_container.style.display = 'none'
    }
    document.getElementById(`${alias}-addons_container`).style.display = 'flex'
}

function create_addons_option_select_button(json, addons_target_option, create_icon, addons_modal_id) {
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let icon = create_icon(json)

    let button = document.createElement('button')
    button.className = 'bg-dark btn-selection-modal'
    button.dataset.bsTarget = `#${addons_modal_id}`
    button.dataset.bsToggle = "modal"
    button.dataset.bsDismiss = "modal"
    button.target_option = addons_target_option
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        show_addons(btn.target_option, document.getElementById(`${addons_modal_id}-body`))
    })

    button.appendChild(icon)
    button_box.appendChild(button)
    return button_box
}

function create_addons_container(target_option) {
    let addons_container = document.createElement('div')
    addons_container.className = 'row row-cols-3 row-cols-md-4 row-cols-lg-6 gy-4'
    addons_container.id = `${target_option}-addons_container`
    return addons_container
}

function clear_addon_roulette_button(btn_addon, enabled_list, available_list, selected_list, placeholder_icon_src) {
    clearTooltips()
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