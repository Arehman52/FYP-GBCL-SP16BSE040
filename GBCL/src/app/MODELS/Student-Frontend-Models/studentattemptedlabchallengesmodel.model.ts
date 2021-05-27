export interface StudentAttemptedLabChallengemodel {
  _id: string;
  LabJoinCode: string,         //foreign key
  StudentzUsername: string,    //foreign key
  LabChallengeQuestionType: string,
  LabChallengeQuestion: string,
  LabChallengeAnswerOptionA: string,
  LabChallengeAnswerOptionB: string,
  LabChallengeAnswerOptionC: string,
  LabChallengeAnswerOptionD: string,
  GainedXPs: number,
  LabChallengeStatus: string,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
}

