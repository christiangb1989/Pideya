import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { PedidosPage } from '../pedidos/pedidos.page';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos:any = {};
  tienda:any = {};
  producto_gallery:any = []
  talla;
  color;
  myId = null;
  _select_talla;
  _select_color;
  media:any;
  constructor(
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController,
    private  apiService: ApiService,
    public alertController: AlertController,
    private location:Location,
    public pedido:PedidosPage
  ) { 
    this.media = this.apiService.media
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'producto/'+ this.myId ).subscribe((res:any)=>{
      console.log(res.producto);
      
      this.productos = res.producto;
      this.tienda = res.negocio;
    })
  }

  selectColor(color){
    this._select_talla = color;
  }

  selectTalla(talla){
    this._select_color = talla;
  }

  restar(){
    // Cantidad 
    var cantidad = document.getElementById('count');
    // Convertir a entero
    var intVal =  parseInt(cantidad.innerText);
    // precio
    var boxPrecio = document.getElementById('precio');

    if(intVal > 1){
      var calc = intVal - 1 ;
      var resultados = (this.productos.precio - this.productos.descuento) * calc;
      if (calc == 1) {
        cantidad.innerText = "1";
        boxPrecio.innerText = "" + resultados.toFixed(2) + "";
      } else {
        cantidad.innerText = ""+ calc +"";
        boxPrecio.innerText = "" + resultados.toFixed(2) + "";
      }
    }

  }

  sumar(){
    // Cantidad 
    var cantidad = document.getElementById('count');
    // Convertir a entero
    var intVal =  parseInt(cantidad.innerText);
    
    
    // precio
    var boxPrecio = document.getElementById('precio');

    if(intVal < 9){
      var calc = intVal + 1 ;
      // Calcular cantidad y precio
      var resultados = (this.productos.precio - this.productos.descuento) * calc;

      if (calc == 9) {
        cantidad.innerText = "9";
        boxPrecio.innerText = "" + resultados.toFixed(2) + "";
      } else {
        cantidad.innerText = ""+ calc +"";
        boxPrecio.innerText = "" + resultados.toFixed(2) + "";
      }
    }
    

  }


  ngOnInit() {
  }

  async presentToast(respuesta) {
    const toast = await this.toastController.create({
      message: respuesta,
      duration: 2000,
      color: 'success',
      position: "middle"
    });
    toast.present();
  }

  async presentAlert(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  addtocart(){

    //return console.log(this.tienda.fcm);
     
    const cantidad = document.getElementById('count').innerText;
    this.storage.get('USER_INFO').then((response) => {
      //Existe datos
      if(response){

        const postData = {
          usuario_id: parseInt(response.user_data.id), 
          producto_id: parseInt(this.myId), 
          cantidad: parseInt(cantidad),
          negocio_id: this.productos.negocio_id,
          fcm: this.tienda.fcm
        }

        this.http.post(this.apiService.apiUrl+'addtocart', postData).subscribe((res:any)=>{
          console.log(res)
          if(res.estado){
            this.presentToast(res.respuesta);
          }else{
            this.presentAlert(res.respuesta)
          }
          this.pedido.loading();
          this.router.navigate(['pedidos/'+response.user_data.id]);
          
        })

      }else{
        this.presentAlert("Iniciar sesión para poder agregar un producto");
      }
    })
    /*
    console.log(this._select_color + "/" + this._select_talla)
    
    console.log('ID ==>' ,this.myId)

    if (0 < this.color.length || 0 < this.talla.length) {
      
    }else{
      const option = {
        usuario_id : this.myId
      }
    }

    

    /*
    // cantidad
    

    // ID del producto
    
    // Get Login data
    this.storage.get('USER_INFO').then((response) => {
      //Existe datos
      if(response){
        // Variables convertidas en enteros para la insercion
        var usuario = parseInt(response.user_data.id);
        var cant = parseInt(cantidad);
        var product = parseInt(this.myId);
        
        // Guarda los datos en el carrito
        this.http.post(this.apiService.apiUrl+'addtocart', {'usuario_id': usuario, 'producto_id': product, 'cantidad': cant}).subscribe((res:any)=>{
          
          if(res.estado){
            this.presentToast(res.respuesta);
          }else{
            this.presentAlert(res.respuesta)
          }
          this.router.navigate(['pedidos/'+response.user_data.id]);
        })

      }else{
        this.presentAlert("Iniciar sesión para poder agregar un producto");
      }
    })
    */
  }
  openImg(img_value){
    var img_main = document.getElementById('imagen_main');
    img_main.setAttribute('src', img_value);
  }

  submitCart(data){
    
    this.http.post(this.apiService.apiUrl+'addtocart/', {data}).subscribe((res:any)=>{
      this.presentToast(res.respuesta);
      
      this.router.navigate(['pedidos/' + data.usuario_id]);
      
    });
  }

  backpage(){
    this.router.navigate(['/tabs/store/products/'+this.productos.negocio_id])
  }
}
