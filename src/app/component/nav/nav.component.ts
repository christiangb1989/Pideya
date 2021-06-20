import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(
    public authService:AuthenticationService
  ) { }

  ngOnInit() {
    AuthenticationService
  }

  salir(){
    localStorage.clear();
    this.authService.logout();
  }
}
