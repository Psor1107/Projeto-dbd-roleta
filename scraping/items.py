from formating_functions import format_name
from general_functions import get_image
from urllib.request import urlopen
from bs4 import BeautifulSoup


def get_items_links():
    # Só deve retornar os links de itens com add-ons disponiveis
    wiki_link = 'https://deadbydaylight.fandom.com/wiki'
    items_with_available_addons = [
        'Flashlights', 'Keys', 'Maps', 'Med-Kits', 'Toolboxes'
    ]
    return [f'{wiki_link}/{item_name}' for item_name in items_with_available_addons]


# USAR OS LINKS PARA COLETAR OS ADDONS


def get_items_info(items_html, icons_path, project_url):
    items = []
    items_names = [
        'Firecrackers', 'Flashlights', 'Keys', 'Maps', 'Med-Kits', 'Toolboxes'
    ]
    for item_name in items_names:
        item = {}
        row = items_html.find('span', id=item_name).findNext('tr').findNext('tr')
        while True:
            headers = row.findAll('th')
            if len(headers) != 2:
                break
            item_icon_object = headers[0]
            item_name_object = headers[1]
            item_description_object = row.findNext('td')
            item['name'] = item_name_object.text.strip()
            formated_item_name = format_name(item['name'])
            item['description'] = item_description_object.text
            item['icon'] = f'{project_url}/{icons_path}/{formated_item_name}.png'
            print(f"Coletando icone do item {item['name']}...")
            get_image(item_icon_object.find('a').get('href'),
                      f'{icons_path}/{formated_item_name}.png',
                      'Não foi possível baixar o icone do item...')
            print(f"Icone do item {item['name']} coletado com sucesso")
            items.append(item)  
            row = row.findNext('tr')
    return items
        
