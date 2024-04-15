from urllib.request import urlretrieve
from time import sleep
from operator import itemgetter
import json


def get_image(image_url, image_save_path, error_message='', infinite_try=False):
    if infinite_try:
        while True:
            try:
                urlretrieve(image_url, image_save_path)
                break
            except Exception as e:
                print(e)
                if error_message:
                    print(error_message)
                sleep(0.5)
    else:
        try:
            urlretrieve(image_url, image_save_path)
        except:
            if error_message:
                print(error_message)


def save_json(json_path, object, print_messages=True):
    if print_messages:
        print("Salvando informações formatadas em JSON...")
    
    with open(json_path, 'w') as perks_file:
        json.dump(object, perks_file)
    
    if print_messages:
        print("Informações salvas com sucesso.")


def definePageRowCollumn(dictList, numberOfColumns, numberOfRows=0):
    if numberOfRows != 0:
        for i, currentDict in enumerate(dictList):
            currentDict['page'] = (i // (numberOfColumns * numberOfRows)) + 1
            currentDict['row'] = ((i // numberOfColumns) % numberOfRows) + 1
            currentDict['column'] = (i % numberOfColumns) + 1
    else:
        for i, currentDict in enumerate(dictList):
            currentDict['row'] = (i // numberOfColumns) + 1
            currentDict['column'] = (i % numberOfColumns) + 1