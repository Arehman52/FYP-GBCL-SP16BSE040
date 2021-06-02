export interface StudentAttemptedLabChallengemodel {
  _id: string;
  LabJoinCode: string,         //foreign key
  StudentzUsername: string,    //foreign key
  AttemptedLabChallenge_id: string,
  LabChallengeQuestionType: string,
  LabChallengeQuestion: string,
  LabChallengeAnswerOptionA: string,
  LabChallengeAnswerOptionB: string,
  LabChallengeAnswerOptionC: string,
  LabChallengeAnswerOptionD: string,
  GainedXPs: number,
  ChallengeAttempted:boolean,
  ChallengeChecked:boolean,
  ChallengeFailedDueToTimeShortage:boolean,
  ChallengeCheated:boolean,

  ChallengeXPs:number,
  ChallengeSolutionByTeacher:string,
  ChallengeMatchPercentage:number

}

