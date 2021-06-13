import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';

import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { GamificationService } from 'src/app/Services/gamification.service';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { LabTasksService } from 'src/app/Services/lab-tasks.service';
import { StudentAttemptedLabTasksService } from 'src/app/Services/student-attempted-lab-tasks.service';


@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent implements OnInit {
  MODAL_HEADING: string;
  MODAL_MESSAGE: string;

  constructor(
    private studentLabDataService: StudentLabDataService,
    private studentAttemptedLabTasksService: StudentAttemptedLabTasksService,
    private gamificiationService:GamificationService, private labTasksService:LabTasksService
    ) { }

  showEditorAndOthererWindows = false;
  showSpinner:boolean = false;
  taskTitleOfTaskBeiingCurrentlyAttempted = '';
  TaskQuestion: string = '';
  CURRRENT_TASK_BEING_ATTEMPTED:LabTasksmodel = null;
  localStorageUsername = localStorage.getItem("UsersUsername");
  localStorageFullName = localStorage.getItem("UserzFirstNameOfUser")+' '+ localStorage.getItem("UserzLastNameOfUser") ;
  LabID = localStorage.getItem("LabID");
  AllLabTasksOfThisLabFromDB: LabTasksmodel[] = [];
  AllStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] = [];
  attemptedLabTasks: LabTasksmodel[] = [];
  unAttemptedLabTasks: LabTasksmodel[] = [];
  STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[];
  ngOnInit(): void {

    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };
    this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

    this.showSpinner = true;

    // this.CURRRENT_TASK_BEING_ATTEMPTED = this.labTasksService.getCurrentLabTaskAttemptingInCPA();

    // console.log("this.CURRRENT_TASK_BEING_ATTEMPTED :::::::",this.CURRRENT_TASK_BEING_ATTEMPTED);
    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    this.AllLabTasksOfThisLabFromDB = this.labTasksService.getAllLabTasksOfThisLabFromDB(objLabJoinCode);
    // this.AllStudentAttemptedLabTasksOfthisStudandThisLab = this.studentAttemptedLabTasksService.RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    setTimeout(() => {
      this.showSpinner = false;
      this.extractUnAttemptedLabTask();

      // console.log("this.attemptedLabTasks : ",this.attemptedLabTasks);
      // console.log("this.unAttemptedLabTasks : ",this.unAttemptedLabTasks);
      // console.log("this.AllLabTasksOfThisLabFromDB : ",this.AllLabTasksOfThisLabFromDB);
      // console.log("this.AllStudentAttemptedLabTasksOfthisStudandThisLab : ",this.AllStudentAttemptedLabTasksOfthisStudandThisLab);
    }, 1200);
  }


  extractUnAttemptedLabTask(){
    console.log("this.AllLabTasksOfThisLabFromDB ============",this.AllLabTasksOfThisLabFromDB);
    for(let i=0; i<this.AllLabTasksOfThisLabFromDB.length;i++){
      if(this.AllLabTasksOfThisLabFromDB[i].TaskBeingAttempted == true){
        console.log("this.AllLabTasksOfThisLabFromDB[i] ==@@@@",this.AllLabTasksOfThisLabFromDB[i]);
        this.CURRRENT_TASK_BEING_ATTEMPTED = {...this.AllLabTasksOfThisLabFromDB[i]};
        console.log("this.CURRRENT_TASK_BEING_ATTEMPTED ==@@@@",this.CURRRENT_TASK_BEING_ATTEMPTED);
      }
    }
  }

  playHurrahAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/hurrah.wav";
    audio.load();
    audio.play();
  }
  playGroansAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/g.wav";
    audio.load();
    audio.play();
  }















////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////// COMPLETED CODE BELOW..
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////







    onSubmitLabTaskClicked(codeForm: NgForm) {

      this.showSpinner = true;

    let labTask: StudentAttemptedLabTaskmodel = {
      LabJoinCode: this.LabID, LabTaskSolutionByTeacher: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskAnswer,LabTaskMatchPercentage:0, LabTaskXPs: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskXPs,
      LabTaskTitle: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskQuestion.substring(0,28)+"...",

      // LabTaskAnswerByTeacher: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskAnswer,

      GainedXPs: 0, LabTaskAnswerCode: codeForm.value.theCode, LabTaskAnswerInput: codeForm.value.theInput, LabTaskAnswerOutput: codeForm.value.theOutput, LabTaskQuestion: this.TaskQuestion, LabTaskAttempted: true, LabTaskChecked: false, StudentzUsername: this.localStorageUsername, _id: '', AttemptedLabTask_id: this.CURRRENT_TASK_BEING_ATTEMPTED._id
    };

    this.CURRRENT_TASK_BEING_ATTEMPTED.AttemptedByStudents.push(this.localStorageUsername);
    this.CURRRENT_TASK_BEING_ATTEMPTED.TaskBeingAttempted = false;

    let result:StudentAttemptedLabTaskmodel[];
    result = this.studentAttemptedLabTasksService.createThisStudentAttemptedLabTask(labTask);
    this.labTasksService.updateThisLabTask(this.CURRRENT_TASK_BEING_ATTEMPTED);
    codeForm.reset();
    this.Errors.emptyCodeFields.status = true;

    setTimeout(()=>{
      this.showSpinner = false;
      let labtaskXPs:number = this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskXPs;
      let gainedXps:number = parseInt(labtaskXPs * result[0].LabTaskMatchPercentage+'',10);
      if(gainedXps/labtaskXPs >0.5){
        this.playHurrahAudio();
      }else{
        this.playGroansAudio();
      }
      this.displayThisMessageInModal("Task attempted","You gained "+gainedXps+" out of "+labtaskXPs+" XPs for this lab task.");


      this.gamificiationService.createHistory_AttemptedLabTask(this.localStorageFullName,this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskQuestion,gainedXps,{LabJoinCode:this.LabID,
      StudentzUsername:this.localStorageUsername});

      this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs+=gainedXps;
      this.studentLabDataService.updateCurrentStatsOfThisStudent(this.STUDz_FETCHED_STATS_FROM_Db[0],{LabJoinCode:this.LabID,
      StudentzUsername:this.localStorageUsername});


    },1500);

    setTimeout(()=>{
      this.showSpinner = true;
      window.location.href = "/STUDENT/Lab/AllLabs";
    },5000);
  }

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////// COMPLETED CODE ABOVE..
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////







compareTwoStrings(first:string, second:string) {
  console.log('first BEFORE:', first);
  console.log('second BEFORE:', second);

	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

  console.log('first AFTER:', first);
  console.log('second AFTER:', second);
	if (first === second) return 1; // identical or empty
  //fool
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
    console.log("firstBigrams : ",firstBigrams);
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

// findBestMatch(mainString, targetStrings) {
// 	if (!this.areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');

// 	const ratings = [];
// 	let bestMatchIndex = 0;

// 	for (let i = 0; i < targetStrings.length; i++) {
// 		const currentTargetString = targetStrings[i];
// 		const currentRating = this.compareTwoStrings(mainString, currentTargetString)
// 		ratings.push({target: currentTargetString, rating: currentRating})
// 		if (currentRating > ratings[bestMatchIndex].rating) {
// 			bestMatchIndex = i
// 		}
// 	}


// 	const bestMatch = ratings[bestMatchIndex]

// 	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
// }

// areArgsValid(mainString: any, targetStrings: any[]) {
// 	if (typeof mainString !== 'string') return false;
// 	if (!Array.isArray(targetStrings)) return false;
// 	if (!targetStrings.length) return false;
// 	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
// 	return true;
// }



















  checkOutput(codeForm: NgForm) {
    if (codeForm.value.theOutput == "") {
      this.Errors.emptyOutputFields.status = true;
    } else {
      this.Errors.emptyOutputFields.status = false;
    }
  }
  checkCode(codeForm: NgForm) {
    if (codeForm.value.theCode == "") {
      this.Errors.emptyCodeFields.status = true;
    } else {
      this.Errors.emptyCodeFields.status = false;
    }
  }


  // setID(Taskid: string) {
  //   this.CURRRENT_TASK_ID = Taskid;
  // }



  checkIfErrors(): boolean {
    return (this.Errors.emptyCodeFields.status);
  }

  setAllErrorsToFalse() {

  }


  Errors = {
    emptyFields: {
      status: true,
      message: "Fields cannot be empty"
    },
    emptyOutputFields: {
      status: true,
      message: "Output field cannot be empty"
    },
    emptyCodeFields: {
      status: true,
      message: "Code field cannot be empty"
    }
  }






  onAttemptClicked(task: LabTasksmodel) {
    this.CURRRENT_TASK_BEING_ATTEMPTED = task;
    this.TaskQuestion = task.LabTaskQuestion;
    this.showEditorAndOthererWindows = true;
    this.taskTitleOfTaskBeiingCurrentlyAttempted = task.LabTaskTitle;

    // let per:number = this.compareTwoStrings('for let i=0; i<length; i++','for(let i=0; i<length; i++)');
    // alert(per);



  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }

  displayThisMessageInModal(MODAL_HEADING: string, MODAL_MESSAGE: string) {
    this.MODAL_HEADING = MODAL_HEADING;
    this.MODAL_MESSAGE = MODAL_MESSAGE;
    document.getElementById("LevelUpdatedModalButton").click();
  }

  reload(){
    window.location.reload()
  }
}
