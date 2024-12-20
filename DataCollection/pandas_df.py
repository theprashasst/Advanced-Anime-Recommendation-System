import pandas as pd
from pandas import json_normalize   
import os
import json

# Open and load the JSON data from a file
with open('full_anime_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

df = json_normalize(data, sep='_')

df.to_csv('anime_data.csv', index=False)