export interface LabChallengesmodel {
  _id: string;
  LabJoinCode: string, //as a foreign key
  //DesiredOutput + MCQs + CodeCompletion
  ChallengeQuestionType: string,
  ChallengeQuestion: string,
  ChallengeOptionA: string,
  ChallengeOptionB: string,
  ChallengeOptionC: string,
  ChallengeOptionD: string,
  ChallengeXPs: number,
  ChallengeAllowedTime: number,
  AttemptedByStudents: string[]



}

