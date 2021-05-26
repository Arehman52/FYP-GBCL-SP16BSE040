export interface LabTasksmodel {
  _id: string;
  LabID: string; //as a foreign key    <== _id of lab where lab task should be displayed
  // labTaskID: {type:String, required : true, unique:true},
  // ChallengeQuestionType: string;
  labTaskTitle: string; // like Lab Task 01
  labTaskQuestion: string;
  labTaskAnswer: string;
  labTaskXPs: number;
}

