export interface Labsmodel {
  _id: string;

  LabJoinCode: string, //as a foreign key
  StudentzUsername: string, //as a foreign key

  Statistics: {
    currentXPs: number,
    currentLevel: number,
    currentBadge: string,
    currentCPPs: number,
    XPsRequiredForPromotion: number,
    XPsRequiredForDemotion: number,
  },
  AttemptedChallenges: [
    {
      AttemptedChallengeID: string,
      CheckedByTeacherStatus: string, //Checked or Unchecked
      GainedXPs: number,
    },
  ],
  AttemptedLabTasks: [
    {
      AttemptedLabTaskID: string,
      GainedXPs: number,
    },
  ],

  RivalStudentzUsernames: [{ type: string }],

  HistoryForRivals: [
    {
      AttemptedLabTaskDescription: string,
      GainedXPsForAttemptedLabTask: number,
      AttemptedLabChallengeDescription: string,
      GainedXPsForAttemptedLabChallenge: number,
    },
  ]
}

