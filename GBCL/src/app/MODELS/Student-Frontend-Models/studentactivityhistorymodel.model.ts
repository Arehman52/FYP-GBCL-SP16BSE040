export interface StudentActivityHistorymodel {
  _id: string;
  LabJoinCode: string,         //foreign key
  StudentzUsername: string,    //foreign key
  LabTaskQuestion: string,
  LabChallengeQuestionType: string,
  LabChallengeQuestion: string,
  GainedOrLoosedXPsCount: number,
  LabTaskStatus: string,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
  LabChallengeStatus: string,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
}

