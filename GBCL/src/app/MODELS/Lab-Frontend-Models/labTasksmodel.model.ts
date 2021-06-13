export interface LabTasksmodel {
  _id: string;
  LabJoinCode: string; //as a foreign key    <== _id of lab where lab task should be displayed
  // labTaskID: {type:String, required : true, unique:true},
  // ChallengeQuestionType: string;
  LabTaskTitle: string;
  LabTaskQuestion: string;
  LabTaskAnswer: string;
  TaskBeingAttempted:boolean;
  LabTaskXPs: number;
  AttemptedByStudents: string[];
}

