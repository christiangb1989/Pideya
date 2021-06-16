import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  idCategory:any;
  storeList:any = [];
  countRow;

  constructor(
    private http:HttpClient, 
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.idCategory = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.apiService.apiUrl+'categoria/'+this.idCategory).subscribe((res:any)=>{
      console.log(res.length);
      this.countRow = res.length;
      this.storeList = res;
    })
  }
  compartir(){

  }
  backpage(){
    this.location.back();
  }
}
