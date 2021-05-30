export interface StudentActivityHistorymodel {
  _id: string;
  LabJoinCode: string,         //foreign key
  StudentzUsername: string,    //foreign key
  wasPromoted: boolean,
  wasDemoted: boolean,
  wasWarned: boolean,
  wasAppreciated: boolean,
  wasExpelled: boolean,
  LabTaskQuestion: string,
  LabChallengeQuestionType: string,
  LabChallengeQuestion: string,
  GainedOrLoosedXPsCount: number,
  LabTaskOrChallengeAttempted: boolean,
  LabTaskOrChallengeChecked: boolean,
  LabTaskOrChallengeFailedDueToTimeout: boolean
}

