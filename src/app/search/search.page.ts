import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ApiService } from '../api.service'
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  searchData = null; 
  productos:any = [];
  media;
  constructor(
    private rutaActiva: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
    ) { 
      this.media = this.apiService.media;
    }

  ngOnInit() {
    var paramer = this.rutaActiva.snapshot.params.producto;
    console.log(paramer);
    this.http.get(this.apiService.apiUrl+"search?producto="+paramer).subscribe((res:any)=>{
      this.productos = res;
      console.log(res);
    })
    
      
  }
  search(){
    this.router.navigate(['search/'+this.searchData]);
  }

}
