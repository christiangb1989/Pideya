import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  orders:any[] = [];
  countRow:any = [];
  media;
  constructor(
    private http:HttpClient,
    private apiService:ApiService,
    private storage:Storage,
    private router:Router,
    public loadingController: LoadingController
  ) {
    this.storage.get("USER_INFO").then((res)=>{
      //console.log(this.orders);
      this.media = this.apiService.media;
      if(res){
        this.http.get(this.apiService.apiUrl+"showBuy/"+res.user_data.id).subscribe((response:any)=>{
          if (!response) {
            //console.log('productos-------->', response);
            return false;
          } 
          let i = 0;
          this.orders = response;
          response.forEach(element => {
            console.log(element);
            this.orders[i].productos = JSON.parse(element.productos)
            i++;
          });

          console.log(this.orders);
          
          this.countRow = response;
          
          
        })
      }else{
        this.router.navigate(['/login']);
      }
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

  restar(idBox){

    var cantidad = document.getElementById(''+idBox+'');
    var valorentero =  parseInt(cantidad.innerText);
    var resultado = valorentero - 1;

    if(valorentero <= 1){
      cantidad.innerText = '1';
    }else{
      cantidad.innerText = ''+resultado+'';
      
    }

  }
  loadingPageF(){
    this.storage.get("USER_INFO").then((res)=>{
      if(res){
        this.http.get(this.apiService.apiUrl+"showBuy/"+res.user_data.id).subscribe((response:any)=>{
          if (!response) {
            //console.log('productos-------->', response);
            return false;
          } 
          let i = 0;
          this.orders = response;
          response.forEach(element => {
            console.log(element);
            this.orders[i].productos = JSON.parse(element.productos)
            i++;
          });

          console.log(this.orders);
          
          this.countRow = response;
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

  sumar(idBox){
    var sumar = 1;
    var cantidad = document.getElementById(''+idBox+'');
    var valorentero =  parseInt(cantidad.innerText);
    var resultado = valorentero + 1;
    if(valorentero >= 9){
      cantidad.innerText = ''+valorentero+'';
    }else{
      cantidad.innerText = ''+resultado+'';
    }

  }

}
