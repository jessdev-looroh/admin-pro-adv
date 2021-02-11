import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
  exports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
  imports: [CommonModule,RouterModule,PipesModule],
})
export class SharedModule {}
