import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    this.getTheme();
  }

  getTheme() {
    let url: string = './assets/css/colors/default-dark.css';
    const theme = localStorage.getItem('theme');
    if (theme != null) {
      url = `./assets/css/colors/${theme}.css`;
    }
    this.linkTheme.setAttribute('href', url);
  }
  getThemeName() :string{
    let theme = localStorage.getItem('theme');
    if (theme == null) {
        theme = 'default';
    }
    return theme;
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', theme);
    // this.checkCurrentTheme(theme);
  }
  checkCurrentTheme(theme: string ,links: NodeListOf<Element>): void {    
    links.forEach((l) => {
      l.classList.remove('working');
      const btnTheme = l.getAttribute('data-theme');
      if (btnTheme == theme) {
        l.classList.add('working');
      }
    });
  }
}
