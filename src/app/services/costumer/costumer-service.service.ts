import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Costumer } from '../../interfaces/costumer';


@Injectable({
  providedIn: 'root'
})
export class CostumerService {


  httpClient = inject(HttpClient);
  baseUrl = 'http://192.168.0.6:8005/costumer';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor() { }

  getAll() {
    return this.httpClient.get(`${this.baseUrl}/list`,  this.httpOptions);
  }

  get(data: any) {
    return this.httpClient.get(`${this.baseUrl}/${data.id}`,  this.httpOptions);
  }

  add(data: any) {
    return this.httpClient.post(`${this.baseUrl}`, data, this.httpOptions);
  }

  update(data: any) {
    return this.httpClient.put(`${this.baseUrl}`, data, this.httpOptions);
  }

  //TODO ajustar por param
  delete(data: Costumer) {
    return this.httpClient.delete(`${this.baseUrl}`, 
      { headers: this.httpOptions.headers,
        body: data });
  }

}
