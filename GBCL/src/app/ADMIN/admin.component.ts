import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  

  Unis = [
    {uniTitle: 'CUI Isb', id: 'ab'},
    {uniTitle: 'CUI Lhr', id: 'bc'},
    {uniTitle: 'CUI Wah', id: 'cd'},
    {uniTitle: 'CUI Vehari', id: 'de'},
    {uniTitle: 'CUI Taxila', id: 'ef'}
]


}
