import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent{

  @Input('initialValue') progreso: number = 50;

  @Output() valorNuevo: EventEmitter<number> = new EventEmitter<number>();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorNuevo.emit(100);
      return (this.progreso = 100);
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorNuevo.emit(0);
      return (this.progreso =0);
    }
    this.progreso = this.progreso + valor;
    this.valorNuevo.emit(this.progreso);
  }
}
