from general_functions import get_image
from formating_functions import format_name
from surv_and_killers import get_overview

def get_killer_info(killer_html, icons_path, project_url):
    killer = {}
    killer_table = killer_html.find("table", class_="infoboxtable").find('tbody')
    killer['alias'] = killer_table.find("tr", class_="infoboxTitle").find("th").text.strip()
    formated_killer_alias = format_name(killer['alias'])
    print(f"Coletando icone do killer {killer['alias']}...")
    get_image(killer_table.find('a', class_='image').get("href"),
              f'{icons_path}/{formated_killer_alias}.png',
              'Erro ao baixar icone de killer...')
    print(f"Icone do killer {killer['alias']} coletada com sucesso...")
    killer['icon'] = f'{project_url}/{icons_path}/{formated_killer_alias}.png'

    for table_row in killer_table.findAll('tr'):
        row_title_object = table_row.find('td', class_='titleColumn')
        row_value_object = table_row.find('td', class_='valueColumn')
        if row_title_object and row_value_object:
            row_title = row_title_object.text.lower()
            if 'name' in row_title:
                killer['name'] = row_value_object.text.strip()
            elif 'movement speed' in row_title and 'alternate' not in row_title:
                killer['movement speed'] = row_value_object.text.strip().replace("\xa0", "")
            elif 'alternate movement speed' in row_title:
                killer['alternate movement speed'] = row_value_object.text.strip().replace("\xa0", "")
            elif 'terror radius' in row_title:
                killer['terror radius'] = row_value_object.text.strip()
            elif 'height' in row_title:
                killer['height'] = row_value_object.text.strip()
    
    killer['overview'] = get_overview(killer_html)
    return killer

def get_killers_addons(killer_html, icons_path, project_url):
    addons = []
    addons_table = get_addons_table(killer_html)
    for table_row in addons_table.findAll("tr")[1:]:
        addon = {}
        row_headers = table_row.findAll('th')
        icon_field = row_headers[0]
        name_field = row_headers[1]

        addon['name'] = name_field.a.text
        addon['description'] = table_row.find('td').text
        formated_addon_name = format_name(addon['name'])
        addon['icon'] = f"{project_url}/{icons_path}/{formated_addon_name}.png"
        print(f"Coletando icone do add-on {addon['name']}...")
        get_image(icon_field.find('a').get('href'),
                 f'{icons_path}/{formated_addon_name}.png',
                 "Erro ao baixar icone do addon...")
        print(f"Icone do add-on {addon['name']} coletado com sucesso")
        addons.append(addon)
    return addons


def get_addons_table(killer_html):
    for title in killer_html.findAll("span", class_='mw-headline'):
        if "Add-ons" in title.text:
            return title.findNext("table")