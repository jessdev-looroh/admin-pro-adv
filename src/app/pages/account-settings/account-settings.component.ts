import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  linkTheme = document.querySelector('#theme');
  links : NodeListOf<Element>; 
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.links =document.querySelectorAll('.selector');    
    this.settingsService.checkCurrentTheme(this.settingsService.getThemeName(),this.links);
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.settingsService.checkCurrentTheme(theme,this.links);
  }

  
}
