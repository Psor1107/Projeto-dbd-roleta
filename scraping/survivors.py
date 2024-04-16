
from general_functions import get_image
from formating_functions import format_name
from surv_and_killers import get_overview

def get_survivor_info(survivor_html, icons_path, project_url):
    survivor = {}
    survivor_table = survivor_html.find("table", class_="infoboxtable").find('tbody')
    survivor['name'] = survivor_table.find("tr", class_="infoboxTitle").find("th").text.strip()
    formated_survivor_name = format_name(survivor['name'])
    
    print(survivor_table.find('a').get('href'))
    print(survivor_table.find('a', class_='image').get("href"))
    
    print(f"Coletando icone do survivor {survivor['name']}...")
    get_image(survivor_table.find('a', class_='image').get("href"),
              f'{icons_path}/{formated_survivor_name}.png',
              'Erro ao baixar icone de killer...')
    print(f"Icone do killer {survivor['name']} coletada com sucesso...")
    survivor['icon'] = f'{project_url}/{icons_path}/{formated_survivor_name}.png'
    
    survivor['overview'] = get_overview(survivor_html)
    return survivor