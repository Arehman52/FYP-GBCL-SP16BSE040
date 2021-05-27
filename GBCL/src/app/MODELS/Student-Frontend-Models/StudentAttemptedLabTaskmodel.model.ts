export interface StudentAttemptedLabTaskmodel {
  _id: string;
  LabJoinCode: string,
  StudentzUsername: string,
  LabTaskQuestion: string,
  LabTaskAnswerCode: string,
  LabTaskAnswerOutput: string,
  LabTaskAnswerInput: string,
  GainedXPs: number,
  LabTaskStatus: string,  // Unattempted, Attempted or Checked
}

