import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-statistic',
  standalone: false,
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})

export class StatisticComponent implements OnInit, OnDestroy {

  constructor() { }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  
    this.onUpdateApi();
  }

  onUpdateApi() {

  }
}