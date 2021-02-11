import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetimagenPipe } from './getimagen.pipe';

@NgModule({
  declarations: [GetimagenPipe],
  exports: [GetimagenPipe],
  imports: [CommonModule],
})
export class PipesModule {}
