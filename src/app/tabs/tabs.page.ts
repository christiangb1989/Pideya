import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
    private storage:Storage
  ) {
    this.userID = localStorage.getItem('userId');
  }
  

  
  salir(){
    this.authService.logout();
  }
}
