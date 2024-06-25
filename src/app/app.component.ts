import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  public appPages = [
    { title: 'Ana Sayfa', url: '/home', icon: 'home' },
    { title: 'Sepetim', url: '/folder/favorites', icon: 'cart' },
    { title: 'Profil', url: '/folder/profile', icon: 'person' },
    { title: 'Yardım', url: '/folder/help', icon: 'help' },
  ];

  constructor() {}
}
