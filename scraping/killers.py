from general_functions import get_image
from formating_functions import format_name
import json
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

def save_killers_info(json_path, killers):
    print("Salvando informações formatadas em JSON...")
    with open(json_path, 'w') as perks_file:
        json.dump(killers, perks_file)
    print("Informações salvas com sucesso.")