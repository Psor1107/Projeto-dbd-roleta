from general_functions import get_image
from formating_functions import format_name
from surv_and_killers import get_overview
from unidecode import unidecode


def get_killer_info(killer_html, icons_path, project_url):
    killer = {}
    killer_table = killer_html.find("table", class_="infoboxtable").find('tbody')
    killer['alias'] = unidecode(killer_table.find("tr", class_="infoboxTitle").find("th").text.strip())
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

import json
import re
def get_killers_addons(addons_html, icons_path, project_url):
    killers_addons = {}
    killers_names = []
    killers = json.load(open('data/killers/killers.json', 'r'))
    for killer in killers:
        killers_names.append(killer['alias'][5:])
    print(killers_names)
        
    for killer_name in killers_names:
        killer_addons_table = addons_html.find('a', title=re.compile(killer_name)).findNext('table', class_='wikitable')
        killer_addons = []
        count = 0
        for table_row in killer_addons_table.findAll('tr'):
            count += 1
            if count < 2:
                continue
            killer_addon = {}
            headers = table_row.findAll('th')
            killer_addon_icon_object = headers[0]
            killer_addon_name_object = headers[1]
            killer_addon_description_object = table_row.find('td')

            killer_addon['name'] = killer_addon_name_object.text.strip()
            formated_killer_addon_name = format_name(killer_addon['name'])
            killer_addon['description'] = killer_addon_description_object.text
            killer_addon['icon'] = f'{project_url}/{icons_path}/{formated_killer_addon_name}.png'
            
            print(f"Coletando o icone do addon {killer_addon['name']}...")
            get_image(killer_addon_icon_object.find('img').get('data-src'),
                      f'{icons_path}/{formated_killer_addon_name}.png',
                      'Erro ao coletar icone de addon de killer...')
            print(f"Icone do addon {killer_addon['name']} coletado com sucesso")
            killer_addons.append(killer_addon)
        killers_addons[killer_name] = killer_addons
    return killers_addons

