import { Injectable } from '@angular/core';
import { StudentActivityHistorymodel } from '../MODELS/Student-Frontend-Models/StudentActivityHistorymodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from '../MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { StudentLabDataService } from './student-lab-data.service';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {

  constructor(private studentLabDataService: StudentLabDataService) { }



  //will be used by the teacher
  WARN_thisStudent(StudentzStats: StudLabDataAndStatsmodel, anyXPsToDeduct: number) {
    StudentzStats.Warned = true;
    StudentzStats.currentXPs -= anyXPsToDeduct;
    this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
      , {
        LabJoinCode: StudentzStats.LabJoinCode,
        StudentzUsername: StudentzStats.StudentzUsername
      });
  }


  // PROMOTEorDEMOTE_thisStudent(StudentzStats:StudLabDataAndStatsmodel, CURRENT_XPs:number, CHANGED_XPs:number){
  //   // CHANGED_XPs can be a positive or negative value



  //   let status = this.detectIfLevelChanged(CURRENT_XPs,CHANGED_XPs);

  //   if(status == "promoted"){
  //     StudentzStats.Promoted = true;
  //     StudentzStats.currentXPs += CHANGED_XPs;
  //     StudentzStats.currentLevel++;
  //     StudentzStats.currentBadge = this.getCurrentBadge(StudentzStats.currentXPs);

  //     this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
  //       ,{
  //         LabJoinCode:StudentzStats.LabJoinCode,
  //         StudentzUsername: StudentzStats.StudentzUsername
  //       });
  //   }



  //   if(status == "demoted"){
  //     StudentzStats.Demoted = true;
  //     StudentzStats.currentXPs -= CHANGED_XPs;
  //     StudentzStats.currentLevel++;
  //     StudentzStats.currentBadge = this.getCurrentBadge(StudentzStats.currentXPs);

  // this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
  //   ,{
  //     LabJoinCode:StudentzStats.LabJoinCode,
  //     StudentzUsername: StudentzStats.StudentzUsername
  //   });
  //   }
  // }





  detectIfLevelChanged(CURRENT_XPs: number, newlyGAINED_XPs: number): string {
    let currentLevel = (CURRENT_XPs / 60) + 1;
    let sumOfNewXPs = CURRENT_XPs + newlyGAINED_XPs;
    let levelCaulatedOf_sumOfNewXPs = (sumOfNewXPs / 60) + 1;
    console.log("currentLevel : ", currentLevel);
    if (levelCaulatedOf_sumOfNewXPs == currentLevel) {
      return "unchanged";
    }
    if (levelCaulatedOf_sumOfNewXPs > currentLevel) {
      return "promoted";
    }
    if (levelCaulatedOf_sumOfNewXPs < currentLevel) {
      return "demoted";
    }

  }




  promote_demote_or_justupdate_Stats(StudentzStats: StudLabDataAndStatsmodel, newlyGAINED_XPs: number): string {
    // detect if level changed???
    let objStudentzUsernamAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel = {
      LabJoinCode: StudentzStats.LabJoinCode,
      StudentzUsername: StudentzStats.StudentzUsername
    };
    let levelChangedStatus = '';

    setTimeout(()=>{


    let currentLevel = (StudentzStats.currentXPs / 60) + 1;
    currentLevel = parseInt(currentLevel.toString(),10);
    let sumOfNewXPs:number = StudentzStats.currentXPs + newlyGAINED_XPs;
    sumOfNewXPs = parseInt(sumOfNewXPs.toString(), 10);
    let levelCaulatedOf_sumOfNewXPs = (sumOfNewXPs / 60) + 1;
    levelCaulatedOf_sumOfNewXPs  = parseInt(levelCaulatedOf_sumOfNewXPs.toString(), 10);
    console.log("currentLevel@@@@ : ",currentLevel);
    console.log("levelCaulatedOf_sumOfNewXPs@@@@ : ",levelCaulatedOf_sumOfNewXPs);
    console.log("newlyGAINED_XPs : ",newlyGAINED_XPs);
    console.log("sumOfNewXPs : ",sumOfNewXPs);

    console.log("currentLevel : ", currentLevel);
    if (levelCaulatedOf_sumOfNewXPs == currentLevel) {
      levelChangedStatus = "unchanged";
      StudentzStats.currentXPs += newlyGAINED_XPs;
      StudentzStats.Promoted = false;
      StudentzStats.Demoted = false;
      StudentzStats.LevelUpdateViewed = true;
      console.log(levelChangedStatus);
    }
    if (levelCaulatedOf_sumOfNewXPs > currentLevel) {
      StudentzStats.LevelUpdateViewed = false;
      levelChangedStatus = "promoted";
      StudentzStats.currentXPs += newlyGAINED_XPs;
      StudentzStats.currentBadge = this.getNextBadge(StudentzStats.currentXPs);
      StudentzStats.currentLevel = levelCaulatedOf_sumOfNewXPs;
      StudentzStats.Promoted = true;
      StudentzStats.Demoted = false;
      console.log(levelChangedStatus);
    }
    if (levelCaulatedOf_sumOfNewXPs < currentLevel) {
      StudentzStats.LevelUpdateViewed = false;
      levelChangedStatus = "demoted";
      StudentzStats.currentXPs += newlyGAINED_XPs;
      StudentzStats.currentBadge = this.getNextBadge(StudentzStats.currentXPs);
      StudentzStats.currentLevel = levelCaulatedOf_sumOfNewXPs;
      StudentzStats.Demoted = true;
      StudentzStats.Promoted = false;
      console.log(levelChangedStatus);
    }


    this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
      , objStudentzUsernamAndLabJoinCode);

    },700);

    return levelChangedStatus;
  }



  justPROMOTE_thisStudent(StudentzStats: StudLabDataAndStatsmodel) {
    StudentzStats.Promoted = true;
    this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
      , {
        LabJoinCode: StudentzStats.LabJoinCode,
        StudentzUsername: StudentzStats.StudentzUsername
      });
  }





  justDEOMOTE_thisStudent(StudentzStats: StudLabDataAndStatsmodel) {
    StudentzStats.Demoted = true;
    this.studentLabDataService.updateCurrentStatsOfThisStudent(StudentzStats
      , {
        LabJoinCode: StudentzStats.LabJoinCode,
        StudentzUsername: StudentzStats.StudentzUsername
      });
  }










  getCurrentLevel(currentXPs: number): number {
    let dump = '';
    let currentLevel = 0;
    currentXPs < 60 ? currentLevel = 1 : dump = 'no-badge';
    currentXPs >= 60 && currentXPs <= 119 ? currentLevel = 2 : dump = 'no-badge';
    currentXPs >= 120 && currentXPs <= 179 ? currentLevel = 3 : dump = 'no-badge';
    currentXPs >= 180 && currentXPs <= 239 ? currentLevel = 4 : dump = 'no-badge';
    currentXPs >= 240 && currentXPs <= 299 ? currentLevel = 5 : dump = 'no-badge';
    currentXPs >= 300 && currentXPs <= 359 ? currentLevel = 6 : dump = 'no-badge';
    currentXPs >= 360 && currentXPs <= 419 ? currentLevel = 7 : dump = 'no-badge';
    currentXPs >= 420 && currentXPs <= 479 ? currentLevel = 8 : dump = 'no-badge';
    currentXPs >= 480 && currentXPs <= 539 ? currentLevel = 9 : dump = 'no-badge';
    currentXPs >= 540 && currentXPs <= 599 ? currentLevel = 10 : dump = 'no-badge';
    currentXPs >= 600 && currentXPs <= 659 ? currentLevel = 11 : dump = 'no-badge';
    currentXPs >= 660 && currentXPs <= 719 ? currentLevel = 12 : dump = 'no-badge';
    currentXPs >= 720 && currentXPs <= 779 ? currentLevel = 13 : dump = 'no-badge';
    currentXPs >= 780 && currentXPs <= 839 ? currentLevel = 14 : dump = 'no-badge';
    currentXPs >= 840 && currentXPs <= 899 ? currentLevel = 15 : dump = 'no-badge';
    currentXPs >= 900 && currentXPs <= 959 ? currentLevel = 16 : dump = 'no-badge';
    currentXPs >= 960 && currentXPs <= 1019 ? currentLevel = 17 : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs <= 1079 ? currentLevel = 18 : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs <= 1139 ? currentLevel = 19 : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs <= 1199 ? currentLevel = 20 : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs <= 1259 ? currentLevel = 21 : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs <= 1319 ? currentLevel = 22 : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs <= 1379 ? currentLevel = 23 : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs <= 1439 ? currentLevel = 24 : dump = 'no-badge';
    currentXPs >= 1440 ? currentLevel = 25 : dump = 'no-badge';
    return currentLevel;
  }

  getXPsForPromotion(currentXPs: number): number {

    let dump = '';
    let xpsForPromotion = 0;
    currentXPs < 60 ? xpsForPromotion = 60 - currentXPs : dump = 'no-badge';
    currentXPs >= 60 && currentXPs <= 119 ? xpsForPromotion = 120 - currentXPs : dump = 'no-badge';
    currentXPs >= 120 && currentXPs <= 179 ? xpsForPromotion = 180 - currentXPs : dump = 'no-badge';
    currentXPs >= 180 && currentXPs <= 239 ? xpsForPromotion = 240 - currentXPs : dump = 'no-badge';
    currentXPs >= 240 && currentXPs <= 299 ? xpsForPromotion = 300 - currentXPs : dump = 'no-badge';
    currentXPs >= 300 && currentXPs <= 359 ? xpsForPromotion = 360 - currentXPs : dump = 'no-badge';
    currentXPs >= 360 && currentXPs <= 419 ? xpsForPromotion = 420 - currentXPs : dump = 'no-badge';
    currentXPs >= 420 && currentXPs <= 479 ? xpsForPromotion = 480 - currentXPs : dump = 'no-badge';
    currentXPs >= 480 && currentXPs <= 539 ? xpsForPromotion = 540 - currentXPs : dump = 'no-badge';
    currentXPs >= 540 && currentXPs <= 599 ? xpsForPromotion = 600 - currentXPs : dump = 'no-badge';
    currentXPs >= 600 && currentXPs <= 659 ? xpsForPromotion = 660 - currentXPs : dump = 'no-badge';
    currentXPs >= 660 && currentXPs <= 719 ? xpsForPromotion = 720 - currentXPs : dump = 'no-badge';
    currentXPs >= 720 && currentXPs <= 779 ? xpsForPromotion = 780 - currentXPs : dump = 'no-badge';
    currentXPs >= 780 && currentXPs <= 839 ? xpsForPromotion = 840 - currentXPs : dump = 'no-badge';
    currentXPs >= 840 && currentXPs <= 899 ? xpsForPromotion = 900 - currentXPs : dump = 'no-badge';
    currentXPs >= 900 && currentXPs <= 959 ? xpsForPromotion = 960 - currentXPs : dump = 'no-badge';
    currentXPs >= 960 && currentXPs <= 1019 ? xpsForPromotion = 1020 - currentXPs : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs <= 1079 ? xpsForPromotion = 1080 - currentXPs : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs <= 1139 ? xpsForPromotion = 1140 - currentXPs : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs <= 1199 ? xpsForPromotion = 1200 - currentXPs : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs <= 1259 ? xpsForPromotion = 1260 - currentXPs : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs <= 1319 ? xpsForPromotion = 1320 - currentXPs : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs <= 1379 ? xpsForPromotion = 1380 - currentXPs : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs <= 1439 ? xpsForPromotion = 1440 - currentXPs : dump = 'no-badge';
    currentXPs >= 1440 ? xpsForPromotion = 1440 : dump = 'no-badge';

    return xpsForPromotion;
  }





  getCurrentBadge(currentXPs: number): string {

    let dump = '';
    let currentBadge: string = '';
    currentXPs < 60 ? currentBadge = 'Beginner I' : dump = 'no-badge';
    currentXPs >= 60 && currentXPs <= 119 ? currentBadge = 'Beginner II' : dump = 'no-badge';
    currentXPs >= 120 && currentXPs <= 179 ? currentBadge = 'Beginner III' : dump = 'no-badge';
    currentXPs >= 180 && currentXPs <= 239 ? currentBadge = 'Beginner IV' : dump = 'no-badge';
    currentXPs >= 240 && currentXPs <= 299 ? currentBadge = 'Intermediate I' : dump = 'no-badge';
    currentXPs >= 300 && currentXPs <= 359 ? currentBadge = 'Intermediate II' : dump = 'no-badge';
    currentXPs >= 360 && currentXPs <= 419 ? currentBadge = 'Intermediate III' : dump = 'no-badge';
    currentXPs >= 420 && currentXPs <= 479 ? currentBadge = 'Intermediate IV' : dump = 'no-badge';
    currentXPs >= 480 && currentXPs <= 539 ? currentBadge = 'Master I' : dump = 'no-badge';
    currentXPs >= 540 && currentXPs <= 599 ? currentBadge = 'Master II' : dump = 'no-badge';
    currentXPs >= 600 && currentXPs <= 659 ? currentBadge = 'Master III' : dump = 'no-badge';
    currentXPs >= 660 && currentXPs <= 719 ? currentBadge = 'Master IV' : dump = 'no-badge';
    currentXPs >= 720 && currentXPs <= 779 ? currentBadge = 'Pro I' : dump = 'no-badge';
    currentXPs >= 780 && currentXPs <= 839 ? currentBadge = 'Pro II' : dump = 'no-badge';
    currentXPs >= 840 && currentXPs <= 899 ? currentBadge = 'Pro III' : dump = 'no-badge';
    currentXPs >= 900 && currentXPs <= 959 ? currentBadge = 'Pro IV' : dump = 'no-badge';
    currentXPs >= 960 && currentXPs <= 1019 ? currentBadge = 'Hotshot I' : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs <= 1079 ? currentBadge = 'Hotshot II' : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs <= 1139 ? currentBadge = 'Hotshot III' : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs <= 1199 ? currentBadge = 'Hotshot IV' : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs <= 1259 ? currentBadge = 'Honoury I' : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs <= 1319 ? currentBadge = 'Honoury II' : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs <= 1379 ? currentBadge = 'Honoury III' : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs <= 1439 ? currentBadge = 'Honoury IV' : dump = 'no-badge';
    currentXPs >= 1440 ? currentBadge = 'ULTIMATE CODER' : dump = 'no-badge';

    return currentBadge;

  }



  getNextBadge(currentXPs: number): string {
    let nextBadge: string = '';
    let dump = '';
    currentXPs < 60 ? nextBadge = 'Beginner II' : dump = 'no-badge';
    currentXPs >= 60 && currentXPs < 120 ? nextBadge = 'Beginner III'                     : dump = 'no-badge';
    currentXPs >= 120 && currentXPs < 180 ? nextBadge = 'Beginner IV'                      : dump = 'no-badge';
    currentXPs >= 180 && currentXPs < 240 ? nextBadge = 'Intermediate I'                       : dump = 'no-badge';
    currentXPs >= 240 && currentXPs < 300 ? nextBadge = 'Intermediate II'                       : dump = 'no-badge';
    currentXPs >= 300 && currentXPs < 360 ? nextBadge = 'Intermediate III'                       : dump = 'no-badge';
    currentXPs >= 360 && currentXPs < 420 ? nextBadge = 'Intermediate IV'                       : dump = 'no-badge';
    currentXPs >= 420 && currentXPs < 480 ? nextBadge = 'Master I'                       : dump = 'no-badge';
    currentXPs >= 480 && currentXPs < 540 ? nextBadge = 'Master II'                       : dump = 'no-badge';
    currentXPs >= 540 && currentXPs < 600 ? nextBadge = 'Master III'                       : dump = 'no-badge';
    currentXPs >= 600 && currentXPs < 660 ? nextBadge = 'Master IV'                       : dump = 'no-badge';
    currentXPs >= 660 && currentXPs < 720 ? nextBadge = 'Pro I'                       : dump = 'no-badge';
    currentXPs >= 720 && currentXPs < 780 ? nextBadge = 'Pro II'                       : dump = 'no-badge';
    currentXPs >= 780 && currentXPs < 840 ? nextBadge = 'Pro III'                       : dump = 'no-badge';
    currentXPs >= 840 && currentXPs < 900 ? nextBadge = 'Pro IV'                       : dump = 'no-badge';
    currentXPs >= 900 && currentXPs < 960 ? nextBadge = 'Hotshot I'                       : dump = 'no-badge';
    currentXPs >= 960 && currentXPs < 1020 ? nextBadge = 'Hotshot II'                       : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs < 1080 ? nextBadge = 'Hotshot III'                       : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs < 1140 ? nextBadge = 'Hotshot IV'                       : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs < 1200 ? nextBadge = 'Honoury I'                       : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs < 1260 ? nextBadge = 'Honoury II'                       : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs < 1320 ? nextBadge = 'Honoury III'                       : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs < 1380 ? nextBadge = 'Honoury IV'                       : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs < 1440 ? nextBadge = 'ULTIMATE CODER'                       : dump = 'no-badge';
    return nextBadge;
  }






  createHistory_wasAllowed(FullName:string,objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:'',GainedOrLoosedXPsCount: 0, Activity: 'Allowed access again',Failed:false,
      Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };


    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }




  createHistory_wasExpelled(FullName:string, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:'',GainedOrLoosedXPsCount: 0, Activity: 'Expelled',Failed:false,
      Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };


    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }







  createHistory_wasWarned(FullName:string, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername, _id: '',
      GainedOrLoosedXPsCount: 50, Activity: 'Warned by Instructor',Failed:false, Passed: false,
      TimeAndDate:new Date().toString().substring(0,21), AttemptedQuestion: '', wasPromotedOrDemotedToLevel: ''
    };
    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }




  createHistory_wasAppreciated(FullName:string, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername, _id: '',
      GainedOrLoosedXPsCount: 50, Activity: 'was Appreciated by Instructor',Failed:false, Passed: false,
      TimeAndDate:new Date().toString().substring(0,21), AttemptedQuestion: '', wasPromotedOrDemotedToLevel: ''
    };
    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }


  createHistory_wasDemoted(FullName:string, wasDemotedToLevel:string,objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername, _id: '',
      GainedOrLoosedXPsCount: 0, Activity: 'was Demoted',Failed:false, Passed: false,
      TimeAndDate:new Date().toString().substring(0,21), AttemptedQuestion:'', wasPromotedOrDemotedToLevel: wasDemotedToLevel
    };

    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }



  createHistory_wasPromoted(FullName:string, wasPromotedToLevel:string,objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){


    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:'',GainedOrLoosedXPsCount: 0, Activity: 'was Promoted',Failed:false,
      Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: wasPromotedToLevel
    };



    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }





// createHistory_isPromoted(FullName:string, LabTaskQuestion:string, GainedXPs:number, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

// }







  createHistory_AttemptedLabTask(FullName:string, LabTaskQuestion:string, GainedXPs:number, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){


    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName,
      LabJoinCode: objUNandLabJC.LabJoinCode,
      StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '',
      AttemptedQuestion:LabTaskQuestion,
      GainedOrLoosedXPsCount: GainedXPs,
      Activity: 'Attempted Lab Task',
      Failed:false, Passed: false,
      TimeAndDate:new Date().toString().substring(0,21),
      wasPromotedOrDemotedToLevel: ''
    };


    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }






  createHistory_Attempted_NonMCQ_LabChallenge(FullName:string, QType:string, GainedXPs:number, LabChallengeQuestion:string, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){


    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:LabChallengeQuestion ,GainedOrLoosedXPsCount: GainedXPs, Activity: 'Attempted '+QType+' Challenge',Failed:false, Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };

    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }













  createHistory_AttemptedMCQChallenge_Passed(FullName:string, LabChallengeQuestion:string, GainedXPs:number, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:LabChallengeQuestion ,GainedOrLoosedXPsCount: GainedXPs, Activity: 'Passed MCQ Challenge',Failed:false, Passed: true, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };


    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }


  createHistory_AttemptedMCQChallenge_Failed(FullName:string, LabChallengeQuestion:string, LosedXPs:number,objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:LabChallengeQuestion ,GainedOrLoosedXPsCount: LosedXPs, Activity: 'Failed MCQ Challenge',Failed:true, Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };


    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }







  createHistory_LabChallengeFailedDueToTimeout(FullName:string, QType:string,objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername, _id: '',
      GainedOrLoosedXPsCount: 50, Activity: 'Failed '+QType+' Challenge due to timeout',Failed:true, Passed: false,
      TimeAndDate:new Date().toString().substring(0,21), AttemptedQuestion: '', wasPromotedOrDemotedToLevel: ''
    };
    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }






  createHistory_StudentFailedLabChallenge(FullName:string, QType:string, LabChallengeQuestion:string, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

    let studhistory: StudentActivityHistorymodel = {
      StudentzFullName:FullName, LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
      _id: '', AttemptedQuestion:LabChallengeQuestion ,GainedOrLoosedXPsCount: 0, Activity: 'Failed '+QType+' Challenge',Failed:true, Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
    };

    this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  }






  // createHistory_StudentFailed_MCQChallenge(LabChallengeQuestion:string, LosedXPs:number, objUNandLabJC:StudentzUsernameAndLabJoinCodemodel){

  //   let studhistory: StudentActivityHistorymodel = {
  //     LabJoinCode: objUNandLabJC.LabJoinCode, StudentzUsername: objUNandLabJC.StudentzUsername,
  //     _id: '', AttemptedQuestion:LabChallengeQuestion ,GainedOrLoosedXPsCount: LosedXPs, Activity: 'Failed MCQ Challenge',Failed:true, Passed: false, TimeAndDate:new Date().toString().substring(0,21), wasPromotedOrDemotedToLevel: ''
  //   };

  //   this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
  // }







}
