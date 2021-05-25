import { Component, OnInit } from '@angular/core';
import { Labsmodel } from 'src/app/MODELS/labsmodel.model';
import { LabsService } from 'src/app/Services/labs.service';

@Component({
  selector: 'app-slab-dashboard',
  templateUrl: './slab-dashboard.component.html',
  styleUrls: ['./slab-dashboard.component.css']
})
export class SlabDashboardComponent implements OnInit {

  constructor(private labsService: LabsService) { }
  ngOnInit() {
    this.TheLab = this.labsService.FetchThisLab(localStorage.getItem("LabID"));
  }
  TheLab:Labsmodel[] = [];
  members = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  localStorageLabId;
  localStorageUsername = localStorage.getItem("UsersUsername");




  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }







}
