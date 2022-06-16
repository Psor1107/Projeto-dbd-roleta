
interface PageInfo {
    btn: Element,
    page_div: HTMLElement
}
const pages_info: { [key: string]: PageInfo } = {}

document.addEventListener("DOMContentLoaded", () => {
    let navbar_list = document.getElementById("navbar-list") as HTMLElement
    for (let list_item of navbar_list.children) {
        let btn = list_item.children[0]
        let page_name = btn.id.replace("btn-", "")
        let page = document.getElementById(`${page_name}-page`) as HTMLElement
        
        pages_info[page_name] = {
            "btn" : btn,
            "page_div" : page
        }
        btn.addEventListener("click", () => { select_page(page_name) })
    }
    select_page('home')
})

function select_page(selected_page_name: string) {
    for (let page_name of Object.keys(pages_info)) {
        if (page_name === selected_page_name) {
            pages_info[page_name]['page_div'].style.display = 'block'
            select_button(pages_info[page_name]['btn'])
        } else {
            pages_info[page_name]['page_div'].style.display = 'none'
            deselect_button(pages_info[page_name]['btn'])
        }
    }
}

function select_button(btn: Element) {
    if (btn.className.indexOf("active") == -1) {
        btn.className += ' active'
    }
}

function deselect_button(btn: Element) {
    btn.className = btn.className.replace(" active", "")
}