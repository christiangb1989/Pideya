import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(
    public authService:AuthenticationService,
    private menu: MenuController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    AuthenticationService
  }

  salir(){
    localStorage.clear();
    this.authService.logout();
  }

  openEnd() {
    this.menu.close();
  }

  compartir(){
    this.socialSharing.share(null, null, null, 'https://play.google.com/store/apps/details?id=com.orivalenty.yamarketapp&hl=es_PE')
  }
}
