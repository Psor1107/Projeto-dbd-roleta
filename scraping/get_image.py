from urllib.request import urlretrieve
from time import sleep


def get_image(image_url, image_save_path, error_message='', infinite_try=True):
    while True:
        try:
            urlretrieve(image_url, image_save_path)
            break
        except:
            print(error_message)
            sleep(0.5)