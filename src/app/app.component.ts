import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Plugins  } from '@capacitor/core';
import { NotificacionService } from './service/notificacion.service';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private authenticationService: AuthenticationService,
    public NotificacionService: NotificacionService
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.NotificacionService.notify();
      SplashScreen.hide();
    });

    this.authenticationService.authState.subscribe(state => {
      // if (state) {
      //   this.router.navigate(['tabs']);
      // } else {
      //   this.router.navigate(['login']);
      // }
    });
  }
}
