import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then(console.log);
  }
  getUsuarios(): Promise<any> {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users').then((res) =>
        res.json().then((body) => resolve(body.data))
      );
    });
    return promesa;
  }
}
