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
  ) {
   this.doRefresh();
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
    this.presentLoading()
    this.storage.get('SET_CART').then( response =>{
      if(response){
        this.router.navigate(['/comprar']);
        setTimeout(()=>{
          this.loadingController.dismiss()
        },2000)
      }else{
        setTimeout(()=>{
          this.loadingController.dismiss()
          this.presentAlert('No hay producto en el carrito.');
        },2000)
      }
    })
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

  loadingPageF(){
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get(this.apiService.apiUrl+'showcart/'+ this.myId ).subscribe((res:any)=>{
      console.log('producto----------->',res.producto_cart);
      
      this.storage.remove('SET_CART')
      this.productos = res.producto_cart;
      
      this.productsInBasket = res.productsInBasket
      this.total = res.total.toFixed(2);
      this.storage.set('SET_CART', this.productos).then((res)=>{
        console.log('disponibles -> ',res);
      })
    })
  }

  public doRefresh() {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadingPageF();
    }, 2000);
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

    this.storage.remove('SET_CART');
    this.presentLoading();
    this.http.get(this.apiService.apiUrl+'delete/cart/'+ordersId).subscribe((res:any)=>{
      this.deleteCar(ordersId);
      this.doRefresh();
      setTimeout(()=>{
        this.loadingController.dismiss()
      },2000)
    })

  }
}
