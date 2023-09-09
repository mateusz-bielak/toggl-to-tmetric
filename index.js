import 'dotenv/config';

const togglUrl = 'https://api.track.toggl.com/api/v9/me';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(`${process.env.TOGGL_API_TOKEN}:api_token`));
headers.append('Content-Type', 'application/json');

const from = process.env.npm_config_from;
const to = process.env.npm_config_to;

const getTimeEntries = async () => {
  const url = `${togglUrl}/time_entries?start_date=${from}&end_date=${to}`;
  const response = await fetch(url, { method: 'GET', headers });

  if (!response.ok) return response.text().then(console.log);

  const data = await response.json();
  console.log(data.map((entry) => entry.description));
};

const getProjects = async () => {
  const url = `${togglUrl}/projects`;
  const response = await fetch(url, { method: 'GET', headers });

  if (!response.ok) return response.text().then(console.log);

  const data = await response.json();
  console.log(data);
};

getTimeEntries();
