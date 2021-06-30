import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Location } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  searchData = null; 
  productos:any = [];
  tienda:any = {};
  myId = null;
  coords: any;
  myUbicacion: any;
  userID = null;
  media:any;
  constructor(
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private socialSharing: SocialSharing,
    public toastController: ToastController,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private location:Location
  ) { 
    this.locate()
    this.media = apiService.media;
  }

  user:any = {};
  localizador(ubicacion){
    this.myUbicacion = ubicacion.subLocality;

  }
  async locate() {

    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  
    var ubi = this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) =>
      this.localizador(result[0])
      )
      .catch((error: any) => console.log(error));
  }
  bannerStore;
  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'productos/'+ this.myId ).subscribe((res:any)=>{
      this.productos = res.product;
      this.tienda = res.tienda;
      this.bannerStore = res.tienda.banner;
      console.log(res.tienda);
    })
  }

  async presentToast(respuesta) {
    const toast = await this.toastController.create({
      message: respuesta,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  search(){
    this.router.navigate(['search/'+this.searchData]);
  }

  addToFavorite(productId){

    this.storage.get('USER_INFO').then((response) => {
      if(response){
       this.userID = parseInt(response.user_data.id);
       this.http.post(this.apiService.apiUrl+'addtofavorite', {'usuario_id': this.userID, 'producto_id': productId}).subscribe((res:any)=>{
         console.log(res.respuesta);
         this.presentToast(res.respuesta);
       })
      }
   })
    
  }
  shared(imagen, id){
    this.socialSharing.share(' Descar nuestra app https://play.google.com/store/apps/details?id=com.yamarketapp.orivalenty y si ya la tienes, visita nuestra tienda', null, imagen, 'https://app.pideya.com.pe/tabs/store/products/'+id)
  }
  backpage(){
    this.location.back()
  }
}
