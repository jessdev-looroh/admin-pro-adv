import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {
  titulo: string;
  tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.inicializarBread();
  }
  inicializarBread() {
    this.tituloSubs$=this.router.events
      .pipe(
        filter((val) => val instanceof ActivationEnd),
        filter((val: ActivationEnd) => val.snapshot.firstChild == null),
        map((val) => val.snapshot.data.titulo)
      )
      .subscribe((data) => {
        console.log(data);
        this.titulo = data;
        document.title = `Adminpro - ${data}`;
      });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
}
