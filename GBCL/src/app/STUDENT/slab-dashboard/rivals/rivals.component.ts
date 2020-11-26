import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rivals',
  templateUrl: './rivals.component.html',
  styleUrls: ['./rivals.component.css']
})
export class RivalsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  rivalNotifications = [
  {rivalID:'id123',rivalName:'AAmir'},
  {rivalID:'id124',rivalName:'AAmir'},
  {rivalID:'id125',rivalName:'AAmir'},
  {rivalID:'id126',rivalName:'AAmir'}
];

}
