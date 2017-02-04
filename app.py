import requests
import bs4
import csv

url = 'http://www.governing.com/gov-data/transportation-infrastructure/most-bicycle-cyclist-deaths-per-capita-by-state-data.html'
data = requests.get(url)
soup = bs4.BeautifulSoup(data.text, "html.parser")


states = soup.select("tbody tr")


#Make a list of the bicycle fatality data I gathered using Soup
for state in states:
    state_text =[state.text.strip().split('\n') for state in states]
    rank_state_death_lst = [[state[0] , state[1], state[2], state[5]] for state in state_text]


#Write to CSV
with open('web_scrape.csv', 'w') as csvfile:
    dict_writer = csv.DictWriter(csvfile, fieldnames=["rank", "state", "aadpmr","total"], delimiter=',')
    dict_writer.writeheader()
    writer = csv.writer(csvfile, delimiter=",")

    for state in rank_state_death_lst:
        writer.writerow(state)