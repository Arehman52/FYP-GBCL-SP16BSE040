export interface StudLabDataAndStatsmodel {
  _id: string;
  LabJoinCode: string, //as a foreign key
  StudentzUsername: string, //as a foreign key
  LevelUpdateViewed: boolean, // if false, then show a level updated Modal and then update it to false.
  RivalStudents: string[],
  currentXPs: number,
  currentLevel: number,
  currentBadge: string,
  currentCPPs: number,
  Warned: boolean,
  Appreciated:boolean,
  StudentzLabAccessStatus: string,  // Expelled or Allowed
}

