from general_functions import get_image, save_json
import json
from formating_functions import format_name


def retrieve_perks(table, icons_path, json_path, project_url):
    perks_list = []
    for table_row in table.findAll('tr')[1:]:
        perk = {}
        row_headers = table_row.findAll('th')
        icon_field = row_headers[0]
        name_field = row_headers[1]
        description_field = table_row.find('td')
        character_field = row_headers[2]

        perk['name'] = name_field.a.text
        formated_perk_name = format_name(perk['name'])
        perk['description'] = description_field.find('div', class_='formattedPerkDesc').text
        perk['character'] = character_field.text.strip().replace('.All', 'General')
        perk['icon'] = f"{project_url}/{icons_path}/{formated_perk_name}.png"
        print(f"Baixando o icone do perk: {perk['name']}")
        get_image(icon_field.find('a').get('href'),
                  f'{icons_path}/{formated_perk_name}.png',
                  "Erro ao baixar o icone, tentando novamente...")
        print("Icone baixado com sucesso")
        perks_list.append(perk)
    
    save_json(json_path, perks_list)