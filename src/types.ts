export type TogglTimeEntry = {
  description: string;
  project_id: string;
  start: string;
  stop: string;
};

export type TogglProject = {
  id: string;
  name: string;
};

export type TmetricProject = {
  id: string;
  name: string;
};

export type TimeEntryBody = {
  startTime: string;
  endTime: string;
  task: { name: string };
  project: { id: string | undefined };
};
