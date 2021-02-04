import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map,filter  } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit {
  retornaIntervalSub : Subscription;
  constructor() {
    this.retornaIntervalSub= this.retornaInterval().subscribe(console.log)
    
  }

  ngOnDestroy(): void {
    this.retornaIntervalSub.unsubscribe();
  }

  retornaInterval(){
    return interval(50).pipe(
      map(i=>i+1),
      filter(i=> (i%2===0))
    );
  }
  ngOnInit(): void {}
}
