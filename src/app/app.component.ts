import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Plugins  } from '@capacitor/core';
import { NotificacionService } from './service/notificacion.service';
const { SplashScreen } = Plugins;
const { App } = Plugins;

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
    public NotificacionService: NotificacionService,
    private zone: NgZone
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.NotificacionService.notify();
      SplashScreen.hide();
    });

    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
          // Example url: https://beerswift.app/tabs/tab2
          // slug = /tabs/tab2
          const slug = data.url.split(".pe").pop();
          if (slug) {
              this.router.navigateByUrl(slug);
          }
          // If no match, do nothing - let regular routing
          // logic take over
      });
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
