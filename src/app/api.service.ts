import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://app.pideya.com.pe/api/";
  media = "https://app.pideya.com.pe/";

  constructor(private http: HttpClient) { }

}
