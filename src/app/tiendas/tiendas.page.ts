import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
})
export class TiendasPage implements OnInit {
  searchData = null; 
  productos:any = [];
  tienda:any = {};
  coords: any;
  myUbicacion: any;
  negocios:any = [];
  myId = null;
  getMall:any;
  media;
  constructor(
    private http:HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService:ApiService,
    private nativeGeocoder: NativeGeocoder,
    private socialSharing: SocialSharing,
    private file: File
  ) { 
    this.media = this.apiService.media;
    this.locate()
  }


  localizador(ubicacion){
    this.myUbicacion = ubicacion.subLocality;

  }
  search(){
    this.router.navigate(['/search/'+this.searchData]);
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
  getBannerMall;
  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'mall/tiendas/'+ this.myId ).subscribe((res:any)=>{
      this.negocios = res[0];
      this.getBannerMall = res[1].banner; 
      console.log('aaaa', JSON.stringify(res[1].banner) );
    })
  }

  compartir(){
    this.socialSharing.share('Compartir app', 'app', 'https://app.orivalentydesign.live/public/source/S1Im8N2XSbbhiHpDDt7aHvJ7tJG8E2xmaSruqqbt.jpeg', 'https://app.orivalentydesign.live/').then((dat)=>{
      console.log('data =>',dat);
      
    }).catch((err)=>{
      console.log('error =>', err);
      
    })
    
  }

  backpage(){
    this.router.navigate(['/tabs/tab1'])
  }

}
