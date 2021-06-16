import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userID = null;
  productos:any = [];
  searchData = null; 
  constructor(
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private apiService: ApiService,
  ) {
    console.log(this.productos.length)
    this.storage.get('USER_INFO').then((response) => {
      if(response){
        this.userID = parseInt(response.user_data.id);
        this.http.get(this.apiService.apiUrl+'favorite/user/'+this.userID).subscribe((res:any)=>{
          if(res.length > 0){
            this.productos = res;
          }
        })
      }
   })

  }

  loadingPageF(){
    this.storage.get('USER_INFO').then((response) => {
      if(response){
        this.userID = parseInt(response.user_data.id);
        this.http.get(this.apiService.apiUrl+'favorite/user/'+this.userID).subscribe((res:any)=>{
          if(res.length > 0){
            this.productos = res;
          }
        })
      }
   })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadingPageF();
      event.target.complete();
    }, 2000);
  }
  search(){
    this.router.navigate(['search/'+this.searchData]);
  }

  deleteCar(ordersId){
    var box = document.getElementById('favorite-'+ordersId);
    box.style.display="none";
  }

  deleteFavorito(ordersId){
    this.http.get(this.apiService.apiUrl+'delete/favorite/'+ordersId).subscribe((res:any)=>{
      this.deleteCar(ordersId);
      //this.presentToast(res.respuesta);
    })
  }
}
