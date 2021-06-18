import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userID;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage:Storage,
    private menu: MenuController
  ) {
    this.userID = localStorage.getItem('userId');
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  
  salir(){
    localStorage.clear();
    this.authService.logout();
  }
}
