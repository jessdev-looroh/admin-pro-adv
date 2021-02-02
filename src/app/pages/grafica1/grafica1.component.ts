import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  labels1: string[] = ['Ingresos', 'Egresos', 'Ganancias'];
  data1= [[1000,300,700]];

  labels2: string[] =["Gaseosa","Nachos","Vitaminas"];
  data2 = [[30,10,50]];
}
