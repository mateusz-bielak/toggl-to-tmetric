import dayjs from 'dayjs';
import 'dotenv/config';

const togglUrl = 'https://api.track.toggl.com/api/v9/me';
const tmetricUrl = 'https://app.tmetric.com/api/v3';

const togglApiToken = btoa(`${process.env.TOGGL_API_TOKEN}:api_token`);
const tmetricApiToken = process.env.TMETRIC_API_TOKEN;

const togglHeaders = new Headers();
togglHeaders.append('Authorization', `Basic ${togglApiToken}`);
togglHeaders.append('Content-Type', 'application/json');

const tmetricHeaders = new Headers();
tmetricHeaders.append('Authorization', `Bearer ${tmetricApiToken}`);
tmetricHeaders.append('Content-Type', 'application/json');
tmetricHeaders.append('accept', 'application/json');

const from = process.env.npm_config_from;
const to = process.env.npm_config_to;

const getTogglTimeEntries = async () => {
  const url = `${togglUrl}/time_entries?start_date=${from}&end_date=${to}`;
  const response = await fetch(url, { method: 'GET', headers: togglHeaders });

  if (!response.ok) return response.text().then(console.log);

  return response.json();
};

const getTogglProjects = async () => {
  const url = `${togglUrl}/projects`;
  const response = await fetch(url, { method: 'GET', headers: togglHeaders });

  if (!response.ok) return response.text().then(console.log);

  return response.json();
};

const getUser = async () => {
  const url = `${tmetricUrl}/user`;
  const response = await fetch(url, { method: 'GET', headers: tmetricHeaders });

  if (!response.ok) return console.log(response.statusText);

  return response.json();
};

const getTmetricProjects = async () => {
  const user = await getUser();
  const url = `${tmetricUrl}/accounts/${user.activeAccountId}/timeentries/projects`;
  const response = await fetch(url, { method: 'GET', headers: tmetricHeaders });

  if (!response.ok) return console.log(response.statusText);

  return response.json();
};

const postTimeEntry = async (body) => {
  const user = await getUser();
  const url = `${tmetricUrl}/accounts/${user.activeAccountId}/timeentries`;

  const response = await fetch(url, {
    method: 'POST',
    headers: tmetricHeaders,
    body: JSON.stringify(body),
  });

  if (!response.ok) return console.log(`${response.status}: ${response.statusText}`);

  const data = await response.json();
  console.log(data);
};

const getTmetricProjectId = (togglProjectId, togglProjects, tmetricProjects) => {
  const togglProjectName = togglProjects.find(({ id }) => id === togglProjectId)?.name;
  return tmetricProjects?.find(({ name }) => name === togglProjectName)?.id;
};

const copyEntriesFromTogglToTmetric = async () => {
  const togglProjects = await getTogglProjects();
  const tmetricProjects = await getTmetricProjects();
  const togglTimeEntries = await getTogglTimeEntries();

  const tmetricTimeEntries = togglTimeEntries.map((entry) => {
    const projectId = getTmetricProjectId(entry.project_id, togglProjects, tmetricProjects);

    const startDate = new Date(entry.start);
    const startTime = dayjs(startDate, 'YYYY-MM-DDTHH::mm:ss');

    const endDate = new Date(entry.stop);
    const endTime = dayjs(endDate, 'YYYY-MM-DDTHH::mm:ss');

    return {
      startTime,
      endTime,
      task: { name: entry.description },
      project: { id: projectId },
    };
  });

  tmetricTimeEntries.forEach(postTimeEntry);
};

copyEntriesFromTogglToTmetric();
