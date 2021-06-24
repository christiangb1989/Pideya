import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonRouterOutlet, Platform } from '@ionic/angular';
const { App } = Plugins;

const { Geolocation } = Plugins;
declare var google;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  authState = new BehaviorSubject(false);
  searchData; 
  categoria:any = [];
  coords: any;
  latitude: number;
  longitude: number;
  myUbicacion: any;
  business:any;
  meatandfish:any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay:false
  };

  slideOptsStoreDistance = {
    initialSlide: 0,
    slidesPerView: 1.2,
    autoplay:false
  };

  slideOptsCC = {
    initialSlide: 0,
    slidesPerView: 4.5,
    autoplay:false
  };

  slideOptsBanner = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay:false
  };

  slideOptscat = {
    initialSlide: 0,
    slidesPerView: 4.5,
    autoplay:false
  };
  malls;
  Banner;
  media;

  nearbyShops:any = [];
  hardwareStore:any = [];
  constructor(
    private http:HttpClient, 
    private apiService: ApiService,
    private router: Router,
    private storage:Storage,
    public alertController: AlertController,
    private nativeGeocoder: NativeGeocoder,
    public loadingController: LoadingController,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
    ) 
  {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.locate();
    this.getMall();
    this.getBanner();
    this.getCategoria();
    this.getNearbyStores();

    this.media = this.apiService.media;

    this.http.get(this.apiService.apiUrl+"meatandfish").subscribe( res =>{    
      if(Array.isArray(res)){
        this.meatandfish = res;
      }else{
        this.meatandfish = [];
      }
    })

  }

  profile(){
    this.presentLoading();
    this.storage.get('USER_INFO').then((data:any)=>{
      console.log(data);
      if(data){
        this.http.post(this.apiService.apiUrl+'login', {'phone':data.user_data.telefono}).subscribe((res:any)=>{
          console.log(res.user_data);
          this.loadingController.dismiss()
          if(res.user_data && res.status){
            this.router.navigate(['/tabs/profile']);
            this.loadingController.dismiss()
          }else{
            this.storage.remove('USER_INFO').then(() => {
              this.loadingController.dismiss()
              this.router.navigate(['/']);
              this.authState.next(false);
              
            });
          }
        })
      }else{
        this.loadingController.dismiss()
        this.presentAlert();
        this.router.navigate(['/login']);
      }

    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Inicia sesión',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  getMall(){
    this.http.get(this.apiService.apiUrl+"mall").subscribe( (res:any) =>{
      console.log('details mall: ', res);
      this.malls = res.data;
    }, (err)=>{
      alert(err);
    })
  }

  getBanner(){
    this.http.get(this.apiService.apiUrl+"banner").subscribe( (res:any) =>{
      console.log('details banner: ', res);
      this.Banner = res.data;
    }, (err)=>{
      alert(err);
    })
  }

  getCategoria(){
    this.http.get(this.apiService.apiUrl+"categoria").subscribe( (res:any) =>{
      console.log('details categoria: ', res);
      this.categoria = res;
    }, (err)=>{
      alert(err);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  


  localizador(ubicacion){
   this.myUbicacion = ubicacion.subLocality;
  }

  // MI UBICACION 
  async locate() {

  }




   
  search(){
    this.router.navigate(['/search/'+this.searchData]);
  }

  async getNearbyStores(){

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    const coordinates = await Geolocation.getCurrentPosition();

    this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options).then((result: NativeGeocoderResult[]) =>{
    this.localizador(result[0])
    })
    .catch((err) => {
      console.log('===========>',err)
    });
    
    this.http.get(this.apiService.apiUrl+'stores').subscribe((response:any)=>{
      let origen = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude)
      response.forEach(element => {
        var lat = element.lat;
        var long = element.long;
        let destino = new google.maps.LatLng(lat, long)
        let maximumDistance = 50.00;
        let calculatedMaximumDistance = (google.maps.geometry.spherical.computeDistanceBetween(origen, destino) / 1000).toFixed(2);
        if (maximumDistance > parseFloat(calculatedMaximumDistance)) {
          this.nearbyShops.push(element)
        }
      });
    })
  }

  async getNearbyStoresHardwareStore(){
    this.http.get(this.apiService.apiUrl+'stores/hardwareStore').subscribe((response:any)=>{
      this.hardwareStore = response;
    })
  }

  compartir(imagen, id){
    this.socialSharing.share(' Descar nuestra app https://play.google.com/store/apps/details?id=com.yamarketapp.orivalenty y si ya la tienes, visita nuestra tienda', null, imagen, 'https://app.pideya.com.pe/tabs/store/products/'+id)
  }
} 
