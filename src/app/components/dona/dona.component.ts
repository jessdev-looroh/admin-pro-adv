import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {

  
  colors: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }];
  
  @Input() titulo :String = "Sin título";
  @Input('labels') doughnutChartLabels: Label[] = [
    'label 1',
    'label 2',
    'label 3',
  ];
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];
  
  doughnutChartType: ChartType = 'doughnut';
  constructor() {}

  ngOnInit(): void {}
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
