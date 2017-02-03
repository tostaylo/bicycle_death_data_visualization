import requests
import bs4
import csv

url = 'http://www.governing.com/gov-data/transportation-infrastructure/most-bicycle-cyclist-deaths-per-capita-by-state-data.html'
data = requests.get(url)
soup = bs4.BeautifulSoup(data.text, "html.parser")


states = soup.select("tbody tr")
print (states)
for state in states:
    print(state)
state_text =[state.text.strip().split('\n') for state in states]
rank_state_death_lst = [[state[0] , state[1], state[5]] for state in state_text]
print(state_text)
print(rank_state_death_lst)







with open('web_scrape.csv', 'w') as csvfile:
    writer = csv.writer(csvfile, delimiter=",")
    for state in rank_state_death_lst:
        writer.writerow(state)