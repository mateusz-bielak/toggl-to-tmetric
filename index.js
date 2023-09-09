const togglUrl = 'https://api.track.toggl.com/api/v9/me';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa('916a8f2f749f936c2570e56b5d035fb3:api_token'));
headers.append('Content-Type', 'application/json');

const getTimeEntries = async () => {
  const url = `${togglUrl}/time_entries?start_date=2023-09-01&end_date=2023-09-08`;
  const response = await fetch(url, { method: 'GET', headers });

  if (!response.ok) return response.text().then(console.log);

  const data = await response.json();
  console.log(data.map((entry) => entry.description));
};

getTimeEntries();
