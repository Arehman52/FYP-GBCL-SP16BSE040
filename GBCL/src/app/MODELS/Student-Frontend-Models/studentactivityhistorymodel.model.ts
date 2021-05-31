export interface StudentActivityHistorymodel {
  _id: string;
  LabJoinCode: string,         //foreign key
  StudentzUsername: string,    //foreign key


  Activity:string,
  GainedOrLoosedXPsCount: number,
  AttemptedQuestion: string,
  Passed: boolean,
  Failed: boolean,
  TimeAndDate: string,
  wasPromotedOrDemotedToLevel:string,
  StudentzFullName: string



  // wasPromoted: boolean,
  // wasDemoted: boolean,
  // wasWarned: boolean,
  // wasAppreciated: boolean,
  // wasExpelled: boolean,
  // LabTaskQuestion: string,
  // LabChallengeQuestionType: string,
  // LabChallengeQuestion: string,
  // LabChallengePassed:boolean,
  // LabChallengeFailed:boolean,
  // LabTaskPassed:boolean,
  // LabTaskFailed:boolean,
  // LabTaskOrChallengeAttempted: boolean,
  // LabTaskOrChallengeChecked: boolean,
  // LabChallengeFailedDueToTimeout: boolean
}

