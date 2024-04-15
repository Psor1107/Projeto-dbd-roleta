from formating_functions import format_name
from general_functions import get_image


def get_items_addons(addons_html, icons_path, project_url):
    items_addons = {}
    items_names = ['Flashlight', 'Key', 'Map', 'Med-Kit', 'Toolbox']
    for item_name in items_names:
        item_addons_table = addons_html.find('span', id=item_name)
        item_addons = []
        for table_row in item_addons_table.findAll('tr')[1:]:
            item_addon = {}
            headers = table_row.findAll('th')
            item_addon_icon_object = headers[0]
            item_addon_name_object = headers[1]
            item_addon_description_object = table_row.find('td')

            item_addon['name'] = item_addon_name_object.text.strip()
            formated_item_addon_name = format_name(item_addon['name'])
            item_addon['description'] = item_addon_description_object.text
            item_addon['icon'] = f'{project_url}/{icons_path}/{formated_item_addon_name}.png'
            print(f"Coletando o icone do addon {item_addon['name']}...")
            get_image(item_addon_icon_object.find('a').get('href'),
                      f'{icons_path}/{formated_item_addon_name}.png',
                      'Erro ao coletar icone de addon de item...')
            print(f"Icone do addon {item_addon['name']} coletado com sucesso")
            item_addons.append(item_addon)
        items_addons[item_name] = item_addons
    return items_addons



def get_items_info(items_html, icons_path, project_url):
    items = []
    items_names = ['Firecrackers', 'Flashlights', 'Keys', 'Maps', 'Med-Kits', 'Toolboxes']
    items_types = ['Firecracker', 'Flashlight', 'Key', 'Map', 'Med-Kit', 'Toolbox']
    for item_name, item_type in zip(items_names, items_types):
        row = items_html.find('span', id=item_name).findNext('tr').findNext('tr')
        while True:
            item = {}
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
            item['type'] = item_type
            print(f"Coletando icone do item {item['name']}...")
            if item_icon_object.find('a') is not None:
                get_image(item_icon_object.find('a').get('href'),
                        f'{icons_path}/{formated_item_name}.png',
                        'Não foi possível baixar o icone do item...')
                print(f"Icone do item {item['name']} coletado com sucesso")
                items.append(item)  
            row = row.findNext('tr')
    return items
        
