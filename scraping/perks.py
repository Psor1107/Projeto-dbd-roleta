from urllib.request import urlretrieve
from time import sleep
import json

def retrieve_perks(table, icons_path, json_path):
    perks_list = []
    for table_row in table.findAll('tr')[1:]:
        sleep(0.5)
        perk = {}
        row_headers = table_row.findAll('th')
        icon_field = row_headers[0]
        name_field = row_headers[1]
        description_field = table_row.find('td')
        character_field = row_headers[2]

        perk['name'] = name_field.a.text
        perk['description'] = description_field.find('div', class_='formattedPerkDesc').text
        perk['character'] = character_field.text.strip().replace('.All', 'General')
        print(f"Baixando o icone do perk: {perk['name']}")
        while True:
            try:
                urlretrieve(icon_field.find('a').get('href'), f'{icons_path}/{perk["name"].replace(":", "")}.png')
                break
            except:
                print("Erro ao baixar o icone, tentando novamente...")
                sleep(0.5)
        print("Icone baixado com sucesso")
        perks_list.append(perk)
    
    with open(json_path, 'w') as perks_file:
        json.dump(perks_list, perks_file)