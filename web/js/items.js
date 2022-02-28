
const items_class = "btn-items"
const items_placeholder = "imgs/item-background.png"
var create_item_icon = (json) => {
    let tooltip_text = `<h2 class='h5' style='text-align: center;'>${json['name']}</h2><p>${json['description']}</p>`
    return create_icon_with_tooltip(tooltip_text, json['icon'])
}

var items
const available_items = []
const enabled_items = []
const selected_items = []

async function load_items() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/items/items.json")
    .then((response) => response.json())
    .then(items_info => {
        items = items_info

        let items_modal = document.getElementById("modal-items-body")
        for (let i = 0; i < items.length; i++) {
            items_modal.appendChild(create_modal_selection_button(i, items[i], enabled_items, available_items, selected_items, create_item_icon , items_class))
        }

        let roulette_container = document.getElementById("items-roulette")
        let btn_item_roulette = create_roulette_button(items, create_item_icon, enabled_items, available_items, selected_items, items_class, items_placeholder)
        btn_item_roulette.id = 'btn-items-roulette'
        roulette_container.appendChild(btn_item_roulette)

        document.getElementById('btn-select-all-items').addEventListener("click", () => {
            select_all_modal_btn(items_modal, enabled_items, available_items, selected_items, items_class)
        })

        document.getElementById('btn-diselect-all-items').addEventListener('click', () => {
            diselect_all_modal_btn(items_modal, enabled_items, available_items, items_class)
        })
    })
}
