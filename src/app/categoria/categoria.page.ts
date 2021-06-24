import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  idCategory:any;
  storeList:any = [];
  countRow;
  media;

  constructor(
    private http:HttpClient, 
    private apiService: ApiService,
    private socialSharing: SocialSharing,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { 

    this.media = this.apiService.media;
  }

  ngOnInit() {
    this.idCategory = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'categoria/'+this.idCategory).subscribe((res:any)=>{
      console.log(res.length);
      this.countRow = res.length;
      this.storeList = res;
    })
  }
  compartir(imagen, id){
    this.socialSharing.share(' Descar nuestra app https://play.google.com/store/apps/details?id=com.yamarketapp.orivalenty y si ya la tienes, visita nuestra tienda', null, imagen, 'https://app.pideya.com.pe/tabs/store/products/'+id)
  }
  backpage(){
    this.location.back();
  }
}
