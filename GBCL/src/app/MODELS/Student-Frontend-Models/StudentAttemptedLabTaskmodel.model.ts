export interface StudentAttemptedLabTaskmodel {
  _id: string;
  AttemptedLabTask_id: string,
  LabJoinCode: string,
  StudentzUsername: string,
  LabTaskQuestion: string,
  LabTaskSolutionByTeacher: string,
  LabTaskMatchPercentage: number,
  LabTaskAnswerCode: string,
  LabTaskAnswerOutput: string,
  LabTaskAnswerInput: string,
  GainedXPs: number,
  // LabTaskStatus: string,  // Unattempted, Attempted or Checked
  LabTaskAttempted:boolean,
  LabTaskChecked:boolean,

  LabTaskTitle: string,
  LabTaskXPs: number,
  LabTaskAnswerByTeacher: string,
}

