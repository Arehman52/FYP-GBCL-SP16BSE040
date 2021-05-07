import { Component, OnInit } from '@angular/core';

import { UniversityModel } from 'src/app/MODELS/universitymodel.model';

@Component({
  selector: 'app-unimanage-labs',
  templateUrl: './unimanage-labs.component.html',
  styleUrls: ['./unimanage-labs.component.css']
})
export class UnimanageLabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  UniversitiesData: UniversityModel[] = [{
    Id: 'uni1',
    UniTitle: 'COMSATS University Islamabad',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending',
    HECID: 'FAC241',
    FacultyCount: 85,
    LabsCount: 34,
    StudentsCount: 391
  },
  {
    Id: 'uni2',
    UniTitle: 'COMSATS University Lahore',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending',
    HECID: 'FAC242',
    FacultyCount: 25,
    LabsCount: 28,
    StudentsCount: 208
  }];


  StudentsData = [{
    Id: 'std1',
    name: 'Abdur Rehman',
    UniTitle: 'COMSATS University Islamabad',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  },
  {
    Id: 'std2',
    name: 'Saad Rafique',
    UniTitle: 'Iqra University Karachi',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  },
  {
    Id: 'std3',
    name: 'Umer Ashraf',
    UniTitle: 'FAST NU Lhr',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  }
];







FacultyData = [{
  Id: 'fac1',
  name: 'Hassan Mansoor',
  UniTitle: 'COMSATS University Islamabad',
  AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
  AccessStatus: 'Pending'
},
{
  Id: 'fac2',
  name: 'Dr. Ishtiaq Ahmed',
  UniTitle: 'IIUI University',
  AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
  AccessStatus: 'Pending'
}
];



localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }



}
