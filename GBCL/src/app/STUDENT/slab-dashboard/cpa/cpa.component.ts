import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { GamificationService } from 'src/app/Services/gamification.service';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';

@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent implements OnInit {
  MODAL_HEADING: string;
  MODAL_MESSAGE: string;

  constructor(private studentLabDataService: StudentLabDataService, private labsService: LabsService, private gamificiationService:GamificationService) { }

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
    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    this.AllLabTasksOfThisLabFromDB = this.labsService.getAllLabTasksOfThisLabFromDB(objLabJoinCode);
    this.AllStudentAttemptedLabTasksOfthisStudandThisLab = this.studentLabDataService.RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    setTimeout(() => {
      this.showSpinner = false;
      this.extractUnAttemptedLabTasks();

      console.log("this.attemptedLabTasks : ",this.attemptedLabTasks);
      console.log("this.unAttemptedLabTasks : ",this.unAttemptedLabTasks);
      console.log("this.AllLabTasksOfThisLabFromDB : ",this.AllLabTasksOfThisLabFromDB);
      console.log("this.AllStudentAttemptedLabTasksOfthisStudandThisLab : ",this.AllStudentAttemptedLabTasksOfthisStudandThisLab);
    }, 1200);
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




  extractUnAttemptedLabTasks() {
    this.unAttemptedLabTasks = [];
    this.attemptedLabTasks = [];

    for (let i = 0; i < this.AllLabTasksOfThisLabFromDB.length; i++) {
      if (this.AllLabTasksOfThisLabFromDB[i].AttemptedByStudents.includes(this.localStorageUsername)) {
        this.attemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      } else {
        this.unAttemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      }
    }

  }












  // comparecodeandtchranswer(){


  //   let code:string = '#include <stdio.h>'+

  //   'int main() {'+
  //     '//code'+
  //     'return 0;'+
  //   '}';




  // // $('.info').append( + '<br />');
  // alert("this.similar_text('its a codepen', 'im on codepen') "+this.similar_text('ABDUR REHMAN', 'ABDUR REHMANs'));
  // // $('.info').append( + '<br />');
  // alert("this.Compare('its a codepen', 'im on codepen') :"+this.Compare('ABDUR REHMAN', 'ABDUR REHMAN'));
  // }
  //   similar_text (first: string, second: string) {
  //     // Calculates the similarity between two strings
  //     // discuss at: http://phpjs.org/functions/similar_text

  //     if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
  //         return 0;
  //     }

  //     first += '';
  //     second += '';

  //     var pos1 = 0,
  //         pos2 = 0,
  //         max = 0,
  //         firstLength = first.length,
  //         secondLength = second.length,
  //         p, q, l, sum;

  //     max = 0;

  //     for (p = 0; p < firstLength; p++) {
  //         for (q = 0; q < secondLength; q++) {
  //             for (l = 0;
  //             (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
  //             if (l > max) {
  //                 max = l;
  //                 pos1 = p;
  //                 pos2 = q;
  //             }
  //         }
  //     }

  //     sum = max;

  //     if (sum) {
  //         if (pos1 && pos2) {
  //             sum += this.similar_text(first.substr(0, pos2), second.substr(0, pos2));
  //         }

  //         if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
  //             sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
  //         }
  //     }

  //     return sum;
  // }

  // Compare(strA: string | any[],strB: string | any[]){
  //     for(var result = 0, i = strA.length; i--;){
  //         if(typeof strB[i] == 'undefined' || strA[i] == strB[i]){

  //         }
  //         else if(strA[i].toLowerCase() == strB[i].toLowerCase())
  //             result++;
  //         else
  //             result += 4;
  //     }
  //     return 1 - (result + 4*Math.abs(strA.length - strB.length))/(2*(strA.length+strB.length));
  // }

  // // }






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


    let result:StudentAttemptedLabTaskmodel[];
    result = this.studentLabDataService.createThisStudentAttemptedLabTask(labTask);
    this.labsService.updateThisLabTask(this.CURRRENT_TASK_BEING_ATTEMPTED);
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
    return (this.Errors.emptyOutputFields.status || this.Errors.emptyCodeFields.status);
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
