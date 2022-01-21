
def get_perks(table):
    perks_list = []
    for table_row in table.findAll('tr')[1:]:
        perk = {}
        row_headers = table_row.findAll('th')
        icon_field = row_headers[0]
        name_field = row_headers[1]
        description_field = table_row.find('td')
        character_field = row_headers[2]

        perk['name'] = name_field.a.text
        perk['description'] = description_field.find('div', class_='formattedPerkDesc').text
        perk['character'] = character_field.text.strip().replace('.All', 'General')
        
        perks_list.append(perk)
    return perks_list