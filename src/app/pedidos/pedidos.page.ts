import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  productos:any = [];
  tienda:any = {};
  myId = null;
  total = null;
  userID = null;
  productsInBasket = null;
  media:any;
  constructor(
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController,
    private apiService: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) 
  {
    
    this.media = this.apiService.media;
    
  }
 
  async presentToast(respuesta) {
    const toast = await this.toastController.create({
      message: respuesta,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  deleteCar(ordersId){
     var box = document.getElementById('pedido-'+ordersId);
     box.style.display="none";
  }

  backpage(){
    this.router.navigate(['/tabs/tab1'])
  }

  ngOnInit() {
    this.presentLoading()
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'showcart/'+ this.myId ).subscribe((res:any)=>{
      console.log(res.producto_cart);
      
      this.productos = res.producto_cart;
      this.productsInBasket = res.productsInBasket
      this.total = res.total.toFixed(2);
      setTimeout(() => {
        this.loadingController.dismiss()
      }, 1000);
    })
  }

  async presentAlert(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  comprar(){
    this.router.navigate(['/comprar']);
  }


  loading(){
    setTimeout(()=>{
      this.getCart();
    },2000)
  }

  async getCart(){
    this.presentLoading()
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    await this.http.get(this.apiService.apiUrl+'showcart/'+ this.myId ).subscribe((res:any)=>{
      this.productos = res.producto_cart;
      this.productsInBasket = res.productsInBasket
      this.total = res.total.toFixed(2);
      setTimeout(() => {
        this.loadingController.dismiss()
      }, 1000);
    })
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  deleteProductCart(ordersId){
    this.presentLoading();
    this.http.get(this.apiService.apiUrl+'delete/cart/product/'+ordersId).subscribe((res:any)=>{
      this.deleteCar(ordersId);
      this.getCart();
      setTimeout(()=>{
        this.loadingController.dismiss()
      },2000)
    })
  }


}
